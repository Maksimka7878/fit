import { useState, useEffect, useCallback } from 'react';
import { GameConfig } from '../lib/gameConfig';
import { StorageAPI } from '../lib/storage';

const getInitialState = () => ({
    level: 1,
    xp: 0,
    gold: 0,
    streak: 0,
    totalDaysActive: 0,
    totalXpEarned: 0,
    totalGoldEarned: 0,
    purchasedRewards: [],
    completedAllDays: 0,
    weeklyXp: [0, 0, 0, 0, 0, 0, 0],
    questsCompletedTotal: 0,
});

const generateDailyQuests = () => {
    const pool = [...GameConfig.QUEST_POOL];
    const shuffle = arr => arr.sort(() => Math.random() - 0.5);

    const workouts = shuffle(pool.filter(q => q.category === 'workout'));
    const mainWorkout = workouts[0] || pool[0];

    const regularPool = pool.filter(q => q.category !== 'workout');
    const easy = shuffle(regularPool.filter(q => q.difficulty === 'easy')).slice(0, 3);
    const medium = shuffle(regularPool.filter(q => q.difficulty === 'medium')).slice(0, 3);
    const hard = shuffle(regularPool.filter(q => q.difficulty === 'hard')).slice(0, 1);

    return [mainWorkout, ...easy, ...medium, ...hard].map(q => ({ ...q, completed: false }));
};

export function useGame() {
    const [state, setState] = useState(getInitialState());
    const [quests, setQuests] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [username, setUsername] = useState(null);

    // Initialize
    useEffect(() => {
        let savedState = StorageAPI.getGameState() || getInitialState();
        let savedQuests = StorageAPI.getQuestsState() || generateDailyQuests();
        const user = StorageAPI.getUsername();

        // Check new day
        const today = new Date().toDateString();
        const lastLogin = StorageAPI.getLastLoginDate();

        if (lastLogin !== today) {
            if (lastLogin) {
                const diffDays = Math.round((new Date(today) - new Date(lastLogin)) / (1000 * 60 * 60 * 24));
                if (diffDays > 1) {
                    savedState.streak = 0;
                } else {
                    if (savedQuests.length > 0 && savedQuests.every(q => q.completed)) {
                        savedState.streak += 1;
                        savedState.completedAllDays += 1;
                    }
                }
            }

            const dayOfWeek = new Date().getDay();
            const idx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            if (idx === 0) {
                savedState.weeklyXp = [0, 0, 0, 0, 0, 0, 0];
            }

            savedQuests = generateDailyQuests();
            StorageAPI.setLastLoginDate(today);
            savedState.totalDaysActive += 1;
        }

        setState(savedState);
        setQuests(savedQuests);
        setUsername(user);
        setIsLoaded(true);
    }, []);

    // Save changes to storage
    useEffect(() => {
        if (isLoaded) {
            StorageAPI.saveGameState(state);
            StorageAPI.saveQuestsState(quests);
        }
    }, [state, quests, isLoaded]);

    const saveUser = async (name) => {
        StorageAPI.saveUsername(name);
        setUsername(name);
        const hasData = await StorageAPI.fetchFromCloud();
        if (hasData) {
            setState(StorageAPI.getGameState() || getInitialState());
            setQuests(StorageAPI.getQuestsState() || generateDailyQuests());
        } else {
            StorageAPI.syncToCloud();
        }
    };

    const getRankInfo = useCallback((level) => {
        let rank = GameConfig.RANKS[0];
        for (const r of GameConfig.RANKS) {
            if (level >= r.level) rank = r;
            else break;
        }
        return rank;
    }, []);

    const getNextRankInfo = useCallback((level) => {
        return GameConfig.RANKS.find(r => r.level > level) || null;
    }, []);

    const getXpForNextLevel = useCallback((level) => {
        return Math.floor(GameConfig.BASE_XP * Math.pow(GameConfig.XP_MULTIPLIER, level - 1));
    }, []);

    const toggleQuest = useCallback((questId) => {
        setQuests(prev => {
            const newQuests = [...prev];
            const qIdx = newQuests.findIndex(q => q.id === questId);
            if (qIdx === -1) return prev;

            const q = { ...newQuests[qIdx], completed: !newQuests[qIdx].completed };
            newQuests[qIdx] = q;

            setState(s => {
                const ns = { ...s };
                let leveledUp = false;
                let gainedXp = 0;
                let gainedGold = 0;

                if (q.completed) {
                    const bonus = Math.floor(q.xp * (ns.streak * 0.05));
                    gainedXp = q.xp + bonus;
                    gainedGold = q.gold;

                    ns.xp += gainedXp;
                    ns.totalXpEarned += gainedXp;
                    ns.gold += gainedGold;
                    ns.totalGoldEarned += gainedGold;
                    ns.questsCompletedTotal += 1;

                    const dayOfWeek = new Date().getDay();
                    const idx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                    const newWeekly = [...(ns.weeklyXp || [0, 0, 0, 0, 0, 0, 0])];
                    newWeekly[idx] += gainedXp;
                    ns.weeklyXp = newWeekly;

                    let xpNeeded = getXpForNextLevel(ns.level);
                    while (ns.xp >= xpNeeded) {
                        ns.xp -= xpNeeded;
                        ns.level += 1;
                        leveledUp = true;
                        xpNeeded = getXpForNextLevel(ns.level);
                    }
                } else {
                    ns.xp = Math.max(0, ns.xp - q.xp);
                    ns.gold = Math.max(0, ns.gold - q.gold);
                }

                // Return a mock event via a custom event for floating numbers and modals
                if (q.completed) {
                    window.dispatchEvent(new CustomEvent('questCompleted', { detail: { gainedXp, gainedGold, leveledUp, newLevel: ns.level } }));
                }

                return ns;
            });

            return newQuests;
        });
    }, [getXpForNextLevel]);

    const buyReward = useCallback((rewardId) => {
        const reward = GameConfig.REWARDS.find(r => r.id === rewardId);
        if (!reward) return false;

        let success = false;
        setState(s => {
            if (s.gold >= reward.cost) {
                success = true;
                const ns = { ...s, gold: s.gold - reward.cost };
                ns.purchasedRewards = [...(ns.purchasedRewards || []), { id: rewardId, date: new Date().toISOString() }];
                return ns;
            }
            return s;
        });

        return success ? reward : false;
    }, []);

    return {
        state,
        quests,
        username,
        isLoaded,
        getRankInfo,
        getNextRankInfo,
        getXpForNextLevel,
        toggleQuest,
        buyReward,
        saveUser
    };
}
