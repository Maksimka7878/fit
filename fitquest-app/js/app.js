// ============================================================
//  FitQuest SaaS — Main Application
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameLogic();

    // ── State ────────────────────────────────────────────────
    let activeTab = 'dashboard';
    let activeCategory = 'all';
    let tipOfDayIdx = Math.floor(Math.random() * game.quests.length);

    // ── DOM References ───────────────────────────────────────
    const $ = id => document.getElementById(id);

    // Header
    const displayUsername = $('display-username');
    const playerLevel = $('player-level');
    const playerRank = $('player-rank');
    const xpFill = $('xp-fill');
    const xpText = $('xp-text');
    const playerGold = $('player-gold');
    const playerStreak = $('player-streak');
    const streakWidget = $('streak-widget');

    // Dashboard
    const dashDone = $('dash-done');
    const dashTotal = $('dash-total');
    const dashLabel = $('dash-label');
    const ringFill = $('ring-fill');
    const ringPct = $('ring-pct');
    const dashboardQuests = $('dashboard-quests');
    const tipOfDayEl = $('tip-of-day');
    const rankCardName = $('rank-card-name');
    const rankCardNext = $('rank-card-next');
    const rankIcon = $('rank-icon');
    const rankProgress = $('rank-progress-fill');
    const rankLvlCurrent = $('rank-lvl-current');
    const rankLvlNext = $('rank-lvl-next');

    // Quests Tab
    const categoryPills = $('category-pills');
    const questMetaText = $('quest-meta-text');
    const questMetaDone = $('quest-meta-done');
    const allQuestsList = $('all-quests-list');
    const questsBadge = $('quests-badge');

    // Stats Tab
    const statStreak = $('stat-streak');
    const statTotalXp = $('stat-total-xp');
    const statQuestsDone = $('stat-quests-done');
    const statTotalGold = $('stat-total-gold');
    const statDays = $('stat-days');
    const statAlldays = $('stat-alldays');
    const weeklyChart = $('weekly-chart');
    const achievementsList = $('achievements-list');

    // Shop Tab
    const shopGoldDisplay = $('shop-gold-display');
    const shopContainer = $('shop-items-container');

    // Modals
    const welcomeModal = $('welcome-modal');
    const usernameInput = $('username-input');
    const saveUsernameBtn = $('save-username-btn');
    const levelModal = $('level-modal');
    const newLevelText = $('new-level-text');
    const newRankText = $('new-rank-text');
    const closeModalBtn = $('close-modal-btn');
    const tipModal = $('tip-modal');
    const tipModalTitle = $('tip-modal-title');
    const tipModalBody = $('tip-modal-body');
    const closeTipBtn = $('close-tip-btn');
    const tipGotItBtn = $('tip-got-it-btn');
    const toast = $('toast');
    const toastText = $('toast-text');
    const buyModal = $('buy-modal');
    const buyModalText = $('buy-modal-text');
    const closeBuyBtn = $('close-buy-btn');

    // ── Navigation ───────────────────────────────────────────
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
        });
    });

    document.querySelectorAll('.link-btn[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.goto));
    });

    function switchTab(tab) {
        activeTab = tab;
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
        document.querySelectorAll('.tab-content').forEach(s => s.classList.toggle('active', s.id === `tab-${tab}`));

        if (tab === 'stats') renderStats();
        if (tab === 'shop') renderShop();
        if (tab === 'quests') renderQuestsTab();
        if (tab === 'dashboard') renderDashboard();
    }

    // ── Header Stats ─────────────────────────────────────────
    function renderHeader() {
        const s = game.state;
        const username = game.getUsername() || 'Герой';
        displayUsername.textContent = username;

        const lvl = s.level;
        playerLevel.textContent = `Lvl ${lvl}`;
        const rankInfo = game.getRankInfo(lvl);
        playerRank.textContent = rankInfo.title;
        playerRank.style.color = rankInfo.color;

        const xpNeeded = game.getXpForNextLevel(lvl);
        const pct = Math.min(100, Math.max(0, (s.xp / xpNeeded) * 100));
        xpFill.style.width = `${pct}%`;
        xpText.textContent = `${s.xp} / ${xpNeeded} XP`;

        playerGold.textContent = s.gold;
        playerStreak.textContent = s.streak;

        if (s.streak > 0) {
            streakWidget.classList.add('streak-active');
        } else {
            streakWidget.classList.remove('streak-active');
        }

        // Badge
        const remaining = game.quests.filter(q => !q.completed).length;
        if (remaining > 0) {
            questsBadge.style.display = 'flex';
            questsBadge.textContent = remaining;
        } else {
            questsBadge.style.display = 'none';
        }
    }

    // ── Dashboard ────────────────────────────────────────────
    function renderDashboard() {
        const { done, total, pct } = game.getCompletionRate();

        // Ring progress
        dashDone.textContent = done;
        dashTotal.textContent = total;
        ringPct.textContent = `${pct}%`;
        const circumference = 2 * Math.PI * 32; // r=32
        const offset = circumference - (pct / 100) * circumference;
        ringFill.style.strokeDashoffset = offset;

        const labels = [
            'Начните первый квест дня! 💪',
            'Отличный старт! Продолжайте 🔥',
            'Вы на правильном пути! ⚡',
            'Более половины сделано! 🚀',
            'Почти готово! Осталось чуть-чуть 🎯',
            'Финальный рывок! 🏁',
            'Все квесты выполнены! Феноменально! 🏆',
        ];
        const labelIdx = Math.floor(pct / (100 / (labels.length - 1)));
        dashLabel.textContent = labels[Math.min(labelIdx, labels.length - 1)];

        // Quick quests (first 4)
        renderQuestCards(dashboardQuests, game.quests.slice(0, 4));

        // Tip of the day
        renderTipOfDay();

        // Rank Card
        renderRankCard();
    }

    function renderTipOfDay() {
        const quest = game.quests[tipOfDayIdx % game.quests.length];
        if (!quest || !quest.tip) {
            tipOfDayEl.innerHTML = `<p>Сегодня без особого совета — просто действуй! 💪</p>`;
            return;
        }
        tipOfDayEl.innerHTML = `
            <div class="tip-card-inner">
                <div class="tip-card-icon">${quest.icon}</div>
                <div class="tip-card-text">
                    <div class="tip-card-title">${quest.tip.title}</div>
                    <div class="tip-card-body">${truncate(quest.tip.body, 120)}</div>
                </div>
            </div>
            <button class="tip-read-btn" data-questid="${quest.id}">Читать полностью →</button>
        `;
        tipOfDayEl.querySelector('.tip-read-btn').addEventListener('click', () => openTipModal(quest));
    }

    function renderRankCard() {
        const lvl = game.state.level;
        const rank = game.getRankInfo(lvl);
        const nextRank = game.getNextRankInfo(lvl);

        rankCardName.textContent = rank.title;
        rankIcon.textContent = rank.title.split(' ').pop(); // last emoji

        if (nextRank) {
            rankCardNext.textContent = `Следующий ранг на уровне ${nextRank.level}`;
            const ranksArr = GameConfig.RANKS;
            const prevIdx = ranksArr.findIndex(r => r.level === rank.level);
            const prevLevel = rank.level;
            const nextLevel = nextRank.level;
            const progress = ((lvl - prevLevel) / (nextLevel - prevLevel)) * 100;
            rankProgress.style.width = `${Math.min(100, progress)}%`;
            rankLvlCurrent.textContent = `Lvl ${prevLevel}`;
            rankLvlNext.textContent = `Lvl ${nextLevel}`;
        } else {
            rankCardNext.textContent = '🔥 Максимальный ранг достигнут!';
            rankProgress.style.width = '100%';
            rankLvlCurrent.textContent = `Lvl ${lvl}`;
            rankLvlNext.textContent = '🏆 MAX';
        }
    }

    // ── Quests Tab ───────────────────────────────────────────
    function renderQuestsTab() {
        renderCategoryPills();
        renderQuestsMeta();
        const filtered = activeCategory === 'all'
            ? game.quests
            : game.quests.filter(q => q.category === activeCategory);
        renderQuestCards(allQuestsList, filtered);
    }

    function renderCategoryPills() {
        categoryPills.innerHTML = '';
        GameConfig.CATEGORIES.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `cat-pill ${cat.id === activeCategory ? 'active' : ''}`;
            btn.innerHTML = `${cat.icon} ${cat.label}`;
            btn.addEventListener('click', () => {
                activeCategory = cat.id;
                renderQuestsTab();
            });
            categoryPills.appendChild(btn);
        });
    }

    function renderQuestsMeta() {
        const { done, total } = game.getCompletionRate();
        questMetaText.textContent = `${total} квестов на сегодня`;
        questMetaDone.textContent = `${done} выполнено ✅`;
    }

    // ── Shared Quest Card Renderer ───────────────────────────
    function renderQuestCards(container, quests) {
        container.innerHTML = '';

        if (quests.length === 0) {
            container.innerHTML = `<div class="empty-state">
                <div class="empty-icon">🔍</div>
                <p>Нет квестов в этой категории</p>
                <p class="empty-sub">Попробуйте другую или выберите "Все"</p>
            </div>`;
            return;
        }

        quests.forEach(quest => {
            const card = document.createElement('div');
            card.className = `quest-item ${quest.completed ? 'completed' : ''} diff-${quest.difficulty}`;
            card.id = `quest-card-${quest.id}`;

            const diffLabel = { easy: 'Лёгко', medium: 'Средне', hard: 'Сложно' }[quest.difficulty];

            card.innerHTML = `
                <div class="quest-left">
                    <div class="quest-icon-wrap ${quest.completed ? 'done' : ''}">${quest.icon}</div>
                    <div class="quest-body">
                        <div class="quest-top-row">
                            <h3 class="quest-name">${quest.title}</h3>
                            <span class="diff-badge diff-${quest.difficulty}">${diffLabel}</span>
                        </div>
                        <p class="quest-desc">${quest.desc}</p>
                        <div class="quest-rewards">
                            <span class="reward-pill xp-pill">+${quest.xp} XP</span>
                            <span class="reward-pill gold-pill">+${quest.gold} 💰</span>
                            ${quest.tip ? `<button class="tip-btn" data-questid="${quest.id}">💡 Совет</button>` : ''}
                        </div>
                    </div>
                </div>
                <div class="quest-check ${quest.completed ? 'checked' : ''}">
                    <span class="check-mark">✓</span>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (e.target.closest('.tip-btn')) return;
                handleQuestToggle(quest.id, e);
            });

            if (quest.tip) {
                card.querySelector('.tip-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    openTipModal(quest);
                });
            }

            container.appendChild(card);
        });
    }

    function handleQuestToggle(questId, e) {
        const result = game.toggleQuest(questId);
        if (!result) return;

        const { quest, xpGained, goldGained, levelData } = result;

        // Update all rendered cards with this id
        document.querySelectorAll(`#quest-card-${questId}`).forEach(card => {
            if (quest.completed) {
                card.classList.add('completed');
                card.querySelector('.quest-icon-wrap').classList.add('done');
                card.querySelector('.quest-check').classList.add('checked');
            } else {
                card.classList.remove('completed');
                card.querySelector('.quest-icon-wrap').classList.remove('done');
                card.querySelector('.quest-check').classList.remove('checked');
            }
        });

        if (quest.completed) {
            // Floating text
            const rect = e.currentTarget ? e.currentTarget.getBoundingClientRect() : { left: 100, top: 200 };
            createFloat(rect.left + 20, rect.top, `+${xpGained} XP`, 'float-xp');
            if (goldGained > 0) {
                setTimeout(() => createFloat(rect.left + 60, rect.top, `+${goldGained} 💰`, 'float-gold'), 150);
            }

            showToast(`+${xpGained} XP, +${goldGained} 💰`);

            // Check level up
            if (levelData.leveledUp) {
                setTimeout(() => showLevelUpModal(levelData.newLevel), 600);
            }

            // Check all done
            const { pct } = game.getCompletionRate();
            if (pct === 100) {
                setTimeout(() => showToast('🏆 Все квесты выполнены! Отличный день!'), 800);
            }
        }

        renderHeader();
        renderDashboard();
        renderQuestsMeta();
        shopGoldDisplay.textContent = game.state.gold;
    }

    // ── Stats Tab ─────────────────────────────────────────────
    function renderStats() {
        const s = game.state;
        statStreak.textContent = s.streak;
        statTotalXp.textContent = s.totalXpEarned;
        statQuestsDone.textContent = s.questsCompletedTotal;
        statTotalGold.textContent = s.totalGoldEarned;
        statDays.textContent = s.totalDaysActive;
        statAlldays.textContent = s.completedAllDays;

        renderWeeklyChart();
        renderAchievements();
    }

    function renderWeeklyChart() {
        const week = game.state.weeklyXp || [0, 0, 0, 0, 0, 0, 0];
        const maxVal = Math.max(...week, 1);
        weeklyChart.innerHTML = '';
        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const todayIdx = (() => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; })();

        week.forEach((val, i) => {
            const pct = Math.round((val / maxVal) * 100);
            const bar = document.createElement('div');
            bar.className = `bar-col ${i === todayIdx ? 'today' : ''}`;
            bar.innerHTML = `
                <div class="bar-val-label">${val > 0 ? val : ''}</div>
                <div class="bar-fill-wrap">
                    <div class="bar-fill" style="height:${pct}%"></div>
                </div>
            `;
            weeklyChart.appendChild(bar);
        });
    }

    function renderAchievements() {
        const s = game.state;
        const achievements = [
            { icon: '💧', title: '1 день активности', unlocked: s.totalDaysActive >= 1 },
            { icon: '🔥', title: 'Streak 3 дня', unlocked: s.streak >= 3 },
            { icon: '⚔️', title: '10 квестов выполнено', unlocked: s.questsCompletedTotal >= 10 },
            { icon: '🏋️', title: 'Достигнуть 5 уровня', unlocked: s.level >= 5 },
            { icon: '💰', title: 'Заработать 500 золота', unlocked: s.totalGoldEarned >= 500 },
            { icon: '🌙', title: '7-дневный streak', unlocked: s.streak >= 7 },
            { icon: '🎯', title: '50 квестов выполнено', unlocked: s.questsCompletedTotal >= 50 },
            { icon: '🏆', title: 'Достигнуть 10 уровня', unlocked: s.level >= 10 },
            { icon: '👑', title: '30-дневный streak', unlocked: s.streak >= 30 },
            { icon: '💎', title: 'Идеальный день ×5', unlocked: s.completedAllDays >= 5 },
            { icon: '⚡', title: '100 квестов выполнено', unlocked: s.questsCompletedTotal >= 100 },
            { icon: '🌟', title: 'Достигнуть 20 уровня', unlocked: s.level >= 20 },
        ];

        achievementsList.innerHTML = '';
        achievements.forEach(a => {
            const el = document.createElement('div');
            el.className = `achievement-item ${a.unlocked ? 'unlocked' : 'locked'}`;
            el.innerHTML = `
                <div class="achievement-icon">${a.unlocked ? a.icon : '🔒'}</div>
                <div class="achievement-name">${a.title}</div>
                <div class="achievement-status">${a.unlocked ? '✅' : '—'}</div>
            `;
            achievementsList.appendChild(el);
        });
    }

    // ── Shop Tab ─────────────────────────────────────────────
    function renderShop() {
        shopGoldDisplay.textContent = game.state.gold;
        shopContainer.innerHTML = '';

        const categories = [
            { key: 'fun', label: '🎉 Маленькие радости' },
            { key: 'upgrade', label: '⬆️ Апгрейды' },
            { key: 'premium', label: '💎 Премиум' },
        ];

        categories.forEach(cat => {
            const items = GameConfig.REWARDS.filter(r => r.category === cat.key);
            if (items.length === 0) return;

            const section = document.createElement('div');
            section.className = 'shop-section';
            section.innerHTML = `<h3 class="shop-section-title">${cat.label}</h3>`;

            items.forEach(reward => {
                const canAfford = game.state.gold >= reward.cost;
                const itemEl = document.createElement('div');
                itemEl.className = `shop-card glass-card ${!canAfford ? 'cant-afford' : ''}`;
                itemEl.innerHTML = `
                    <div class="shop-card-icon">${reward.icon}</div>
                    <div class="shop-card-info">
                        <div class="shop-card-title">${reward.title}</div>
                        <div class="shop-card-desc">${reward.desc}</div>
                        <div class="shop-card-cost ${canAfford ? 'affordable' : 'expensive'}">💰 ${reward.cost}</div>
                    </div>
                    <button class="buy-btn ${!canAfford ? 'disabled' : ''}" ${!canAfford ? 'disabled' : ''} data-rewardid="${reward.id}">
                        ${canAfford ? 'Купить' : 'Мало 💰'}
                    </button>
                `;

                if (canAfford) {
                    itemEl.querySelector('.buy-btn').addEventListener('click', () => handleBuy(reward.id));
                }

                section.appendChild(itemEl);
            });

            shopContainer.appendChild(section);
        });
    }

    function handleBuy(rewardId) {
        const result = game.buyReward(rewardId);
        if (result.success) {
            buyModalText.textContent = `Вы купили: ${result.reward.title}! Наслаждайтесь заслуженной наградой 🎉`;
            buyModal.classList.remove('hidden');
            renderHeader();
            renderShop();
        }
    }

    closeBuyBtn.addEventListener('click', () => buyModal.classList.add('hidden'));

    // ── Tip Modal ────────────────────────────────────────────
    function openTipModal(quest) {
        if (!quest.tip) return;
        tipModalTitle.textContent = quest.tip.title;
        tipModalBody.textContent = quest.tip.body;
        tipModal.classList.remove('hidden');
    }

    closeTipBtn.addEventListener('click', () => tipModal.classList.add('hidden'));
    tipGotItBtn.addEventListener('click', () => tipModal.classList.add('hidden'));
    tipModal.addEventListener('click', e => { if (e.target === tipModal) tipModal.classList.add('hidden'); });

    // ── Level Up Modal ───────────────────────────────────────
    function showLevelUpModal(newLevel) {
        newLevelText.textContent = newLevel;
        const rank = game.getRankInfo(newLevel);
        newRankText.textContent = rank.title;
        newRankText.style.color = rank.color;
        levelModal.classList.remove('hidden');
    }
    closeModalBtn.addEventListener('click', () => levelModal.classList.add('hidden'));

    // ── Welcome Modal ────────────────────────────────────────
    function checkFirstLogin() {
        if (!game.getUsername()) {
            welcomeModal.classList.remove('hidden');
            setTimeout(() => usernameInput.focus(), 300);
        }
    }

    saveUsernameBtn.addEventListener('click', () => {
        const name = usernameInput.value.trim() || 'Герой';
        game.setUsername(name);
        welcomeModal.classList.add('hidden');
        renderHeader();
        renderDashboard();
    });

    usernameInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') saveUsernameBtn.click();
    });

    // ── Toast ────────────────────────────────────────────────
    let toastTimeout;
    function showToast(message) {
        toast.classList.remove('hidden');
        toast.classList.add('show');
        toastText.textContent = message;
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 400);
        }, 2500);
    }

    // ── Floating XP/Gold Text ────────────────────────────────
    function createFloat(x, y, text, cls) {
        const el = document.createElement('div');
        el.className = cls;
        el.textContent = text;
        el.style.left = `${x}px`;
        el.style.top = `${y + window.scrollY}px`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
    }

    // ── Helpers ──────────────────────────────────────────────
    function truncate(str, maxLen) {
        if (!str) return '';
        return str.length > maxLen ? str.slice(0, maxLen).trim() + '...' : str;
    }

    // ── Initial Render ───────────────────────────────────────
    renderHeader();
    renderDashboard();
    checkFirstLogin();
});
