import React, { useState, useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { GameConfig } from './lib/gameConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckSquare, BarChart2, ShoppingBag, Zap, Droplet, Moon, Coffee, Shield, Target } from 'lucide-react';

// Icons mapping for Lucide
const IconMap = {
  '⚡': <Zap className="w-5 h-5" />,
  '💧': <Droplet className="w-5 h-5" />,
  '🌙': <Moon className="w-5 h-5" />,
  '🥗': <Coffee className="w-5 h-5" />,
  '🏃': <Activity className="w-5 h-5" />,
  '🏋️': <Shield className="w-5 h-5" />,
  '🧘': <Activity className="w-5 h-5" />,
  '🧠': <Target className="w-5 h-5" />,
  '🔥': <Zap className="w-5 h-5 text-orange-400" />
};

export default function App() {
  const { state, quests, username, isLoaded, getRankInfo, getNextRankInfo, getXpForNextLevel, toggleQuest, buyReward, saveUser } = useGame();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showWelcome, setShowWelcome] = useState(false);
  const [nameInput, setNameInput] = useState('');

  // Modals state
  const [activeTip, setActiveTip] = useState(null);
  const [levelUpData, setLevelUpData] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isLoaded && !username) {
      setShowWelcome(true);
    }
  }, [isLoaded, username]);

  useEffect(() => {
    const handleQuestCompleted = (e) => {
      const { gainedXp, gainedGold, leveledUp, newLevel } = e.detail;
      setToast(\`+\${gainedXp} XP, +\${gainedGold} 💰\`);
      setTimeout(() => setToast(null), 2500);

      if (leveledUp) {
        setTimeout(() => setLevelUpData(newLevel), 500);
      }
    };
    
    window.addEventListener('questCompleted', handleQuestCompleted);
    return () => window.removeEventListener('questCompleted', handleQuestCompleted);
  }, []);

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center text-white">Загрузка...</div>;

  const rank = getRankInfo(state.level);
  const xpNeeded = getXpForNextLevel(state.level);
  const xpPct = Math.min(100, Math.max(0, (state.xp / xpNeeded) * 100));
  const doneQuestsCount = quests.filter(q => q.completed).length;
  const questsUnfinished = quests.length - doneQuestsCount;

  return (
    <div className="pb-24 max-w-md mx-auto min-h-screen relative">
      {/* Header Profile */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 py-3">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
              {username ? username[0].toUpperCase() : 'H'}
            </div>
            <div>
              <div className="text-sm font-semibold">{username || 'Герой'}</div>
              <div className="text-xs" style={{ color: rank.color }}>{rank.title} • Lvl {state.level}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium">
              <span>🔥</span> {state.streak}
            </div>
            <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium text-amber-400">
              <span>💰</span> {state.gold}
            </div>
          </div>
        </div>
        
        {/* XP Bar */}
        <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${ xpPct } % ` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="text-[10px] text-slate-400 text-right mt-1">{state.xp} / {xpNeeded} XP</div>
      </header>

      {/* Main Content Area */}
      <main className="p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <Dashboard key="dash" state={state} quests={quests} toggleQuest={toggleQuest} rank={rank} getNextRankInfo={getNextRankInfo} openTip={setActiveTip} />}
          {activeTab === 'quests' && <Quests key="quests" quests={quests} toggleQuest={toggleQuest} openTip={setActiveTip} />}
          {activeTab === 'stats' && <Stats key="stats" state={state} quests={quests} />}
          {activeTab === 'shop' && <Shop key="shop" state={state} buyReward={buyReward} setToast={setToast} />}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-white/10 safe-area-pb">
        <div className="max-w-md mx-auto flex justify-around p-2">
          <NavBtn icon={<Activity />} label="Главная" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavBtn icon={<CheckSquare />} label="Квесты" active={activeTab === 'quests'} onClick={() => setActiveTab('quests')} badge={questsUnfinished > 0 ? questsUnfinished : null} />
          <NavBtn icon={<BarChart2 />} label="Прогресс" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
          <NavBtn icon={<ShoppingBag />} label="Магазин" active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
        </div>
      </nav>

      {/* Modals */}
      <AnimatePresence>
        {showWelcome && (
          <Modal title="Добро пожаловать в FitQuest!">
            <p className="text-slate-300 text-sm mb-4">Как нам вас называть, герой?</p>
            <input 
              className="w-full bg-slate-800 border-none rounded-xl p-3 text-white mb-4 outline-none focus:ring-2 focus:ring-blue-500"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              placeholder="Введите имя..."
              autoFocus
            />
            <button 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors"
              onClick={() => {
                if(nameInput.trim()) {
                  saveUser(nameInput.trim());
                  setShowWelcome(false);
                }
              }}
            >
              Начать приключение
            </button>
          </Modal>
        )}

        {activeTip && (
          <Modal title={activeTip.tip.title} onClose={() => setActiveTip(null)}>
            <div className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeTip.tip.body}
            </div>
            <button 
              className="w-full bg-blue-600/20 text-blue-400 font-semibold py-3 rounded-xl hover:bg-blue-600/30 transition-colors"
              onClick={() => setActiveTip(null)}
            >
              Понятно, спасибо!
            </button>
          </Modal>
        )}

        {levelUpData && (
          <Modal title="Уровень повышен! 🎉" onClose={() => setLevelUpData(null)}>
            <div className="text-center py-6 block w-full">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-amber-500 mb-2">
                {levelUpData}
              </div>
              <div className="text-slate-300 text-sm mb-1">Ваш новый ранг:</div>
              <div className="text-xl font-bold" style={{ color: getRankInfo(levelUpData).color }}>
                {getRankInfo(levelUpData).title}
              </div>
            </div>
            <button 
              className="w-full bg-amber-500/20 text-amber-500 font-semibold py-3 rounded-xl hover:bg-amber-500/30 transition-colors"
              onClick={() => setLevelUpData(null)}
            >
              Продолжить
            </button>
          </Modal>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass-panel px-4 py-2 rounded-full text-sm font-semibold text-white pointer-events-none"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// Sub-Components
// -------------------------------------------------------------

function NavBtn({ icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} className={`relative flex flex - col items - center justify - center w - 16 h - 14 transition - colors ${ active? 'text-blue-400': 'text-slate-500 hover:text-slate-400' }`}>
      {icon}
      <span className="text-[10px] font-medium mt-1">{label}</span>
      {badge && <span className="absolute top-1 right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
    </button>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="glass-panel w-full max-w-sm rounded-[24px] p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 pr-6">{title}</h2>
        {children}
      </motion.div>
    </motion.div>
  );
}

// --- Dashboard Tab ---
function Dashboard({ state, quests, toggleQuest, rank, getNextRankInfo, openTip }) {
  const doneCount = quests.filter(q => q.completed).length;
  const pct = quests.length > 0 ? (doneCount / quests.length) * 100 : 0;
  const nextRank = getNextRankInfo(state.level);
  
  // Pick random tip among incomplete
  const incompleteQuests = quests.filter(q => !q.completed && q.tip);
  const tipQuest = incompleteQuests.length > 0 ? incompleteQuests[0] : quests.find(q => q.tip);

  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
      
      {/* Daily Progress Ring */}
      <div className="glass-panel rounded-3xl p-6 flex items-center gap-6">
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" className="stroke-slate-800" strokeWidth="8" fill="none" />
            <motion.circle 
              cx="50" cy="50" r="40" 
              className="stroke-blue-500" 
              strokeWidth="10" 
              fill="none" 
              strokeLinecap="round"
              initial={{ strokeDasharray: '251.2', strokeDashoffset: '251.2' }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * pct) / 100 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-bold">{Math.round(pct)}%</span>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-1">Прогресс дня</h2>
          <p className="text-sm text-slate-400 mb-2">Выполнено {doneCount} из {quests.length} за сегодня.</p>
          <div className="text-xs font-medium text-emerald-400">{pct === 100 ? 'Идеальный день! 🏆' : 'Продолжайте в том же духе! 💪'}</div>
        </div>
      </div>

      {/* Main Focus / Quick Quests */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Задачи на сегодня</h3>
        </div>
        <div className="space-y-3">
          {quests.slice(0, 3).map(q => (
            <QuestCard key={q.id} quest={q} toggleQuest={toggleQuest} openTip={openTip} />
          ))}
        </div>
      </div>

      {/* Rank Card */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform">{rank.title.split(' ').pop()}</div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Текущий ранг</div>
        <div className="text-2xl font-bold mb-4" style={{ color: rank.color }}>{rank.title}</div>
        
        {nextRank ? (
          <>
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Lvl {rank.level}</span>
              <span>Lvl {nextRank.level}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-white/30" 
                style={{ width: `${ Math.min(100, ((state.level - rank.level) / (nextRank.level - rank.level)) * 100) } % ` }}
              />
            </div>
            <div className="text-xs text-slate-500">Следующий ранг на {nextRank.level} уровне</div>
          </>
        ) : (
          <div className="text-sm text-amber-500 font-bold">Максимальный ранг достигнут!</div>
        )}
      </div>

      {/* Tip of the day */}
      {tipQuest && (
        <div className="glass-panel p-5 rounded-3xl flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <div className="flex gap-3">
            <div className="text-xl">{tipQuest.icon}</div>
            <div>
              <h4 className="font-bold text-sm mb-1">{tipQuest.tip.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{tipQuest.tip.body}</p>
            </div>
          </div>
          <button onClick={() => openTip(tipQuest)} className="text-xs text-amber-500 font-semibold self-start ml-8 hover:underline">Читать полностью →</button>
        </div>
      )}

    </motion.div>
  );
}

// --- Quest Card ---
function QuestCard({ quest, toggleQuest, openTip }) {
  const diffColors = { easy: 'text-emerald-400 bg-emerald-400/10', medium: 'text-blue-400 bg-blue-400/10', hard: 'text-rose-400 bg-rose-400/10' };
  const diffLabels = { easy: 'Легко', medium: 'Cредне', hard: 'Сложно' };

  return (
    <motion.div 
      layout
      className={`glass - panel p - 4 rounded - 2xl flex gap - 4 items - center transition - colors ${ quest.completed ? 'opacity-60 bg-slate-800/20' : '' }`}
      onClick={() => toggleQuest(quest.id)}
    >
      <div className={`w - 12 h - 12 shrink - 0 flex items - center justify - center text - xl rounded - full transition - colors ${ quest.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5' }`}>
        {quest.completed ? '✓' : quest.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font - bold text - sm mb - 0.5 truncate ${ quest.completed ? 'line-through text-slate-400' : 'text-white' }`}>{quest.title}</h4>
        <p className="text-[11px] text-slate-400 mb-2 truncate">{quest.desc}</p>
        <div className="flex gap-2 text-[10px] font-semibold">
          <span className="text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full">+{quest.xp} XP</span>
          <span className="text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full">+{quest.gold} 💰</span>
          {!quest.completed && <span className={`px - 2 py - 0.5 rounded - full ${ diffColors[quest.difficulty]}`}>{diffLabels[quest.difficulty]}</span>}
        </div>
      </div>
      {quest.tip && !quest.completed && (
        <button 
          onClick={(e) => { e.stopPropagation(); openTip(quest); }}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 shrink-0"
        >
          💡
        </button>
      )}
    </motion.div>
  );
}

// --- Quests Tab ---
function Quests({ quests, toggleQuest, openTip }) {
  const [activeCat, setActiveCat] = useState('all');
  const filtered = activeCat === 'all' ? quests : quests.filter(q => q.category === activeCat);

  return (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">Все квесты</h2>
        <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full">{quests.filter(q=>q.completed).length} / {quests.length}</span>
      </div>
      
      {/* Categories Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 snap-x">
        {GameConfig.CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`shrink - 0 px - 4 py - 2 rounded - full text - xs font - semibold flex items - center gap - 1.5 transition - all snap - start
              ${ activeCat === cat.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
          >
            <span>{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-3 pt-2">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 text-slate-500 text-sm">
              В этой категории сегодня ничего нет
            </motion.div>
          ) : (
            filtered.map(q => (
              <QuestCard key={q.id} quest={q} toggleQuest={toggleQuest} openTip={openTip} />
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- Stats Tab ---
function Stats({ state }) {
  const days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  const maxVal = Math.max(...(state.weeklyXp || [0,0,0,0,0,0,0]), 1);
  const todayIdx = (() => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; })();

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6">
      
      {/* Mini stats cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel p-4 rounded-3xl flex flex-col items-center justify-center">
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">{state.streak}</div>
          <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Дней подряд</div>
        </div>
        <div className="glass-panel p-4 rounded-3xl flex flex-col items-center justify-center">
          <div className="text-2xl mb-1">⚔️</div>
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">{state.questsCompletedTotal}</div>
          <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Квестов всего</div>
        </div>
      </div>

      <div className="glass-panel p-5 rounded-3xl">
        <h3 className="font-bold mb-4">Опыт за неделю</h3>
        <div className="flex justify-between items-end h-32 pt-4">
          {(state.weeklyXp || [0,0,0,0,0,0,0]).map((val, i) => {
            const h = (val / maxVal) * 100;
            return (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 relative group">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] font-bold text-blue-400 transition-opacity">{val}</div>
                <div className="w-full max-w-[12px] h-24 bg-slate-800 rounded-full flex items-end overflow-hidden">
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: `${ h }% ` }} transition={{ delay: i * 0.1, type: "spring" }}
                    className={`w - full rounded - full ${ i === todayIdx ? 'bg-gradient-to-t from-blue-600 to-blue-400' : 'bg-slate-600' } `}
                  />
                </div>
                <span className={`text - [10px] font - semibold ${ i === todayIdx ? 'text-blue-400' : 'text-slate-500' } `}>{days[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-panel p-5 rounded-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest">Абсолютные показатели</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <span className="text-sm">Всего заработано XP</span>
            <span className="font-bold text-blue-400 text-lg">{state.totalXpEarned}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <span className="text-sm">Всего заработано 💰</span>
            <span className="font-bold text-amber-400 text-lg">{state.totalGoldEarned}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <span className="text-sm">Всего дней в приложении</span>
            <span className="font-bold text-white text-lg">{state.totalDaysActive}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Идеальных дней (100%)</span>
            <span className="font-bold text-emerald-400 text-lg">{state.completedAllDays}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Shop Tab ---
function Shop({ state, buyReward, setToast }) {
  const categories = [
    { key: 'fun', label: '🎉 Маленькие радости' },
    { key: 'upgrade', label: '⬆️ Апгрейды' },
    { key: 'premium', label: '💎 Премиум' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      
      <div className="glass-panel p-6 rounded-3xl text-center">
        <div className="text-slate-400 text-sm mb-1">Доступно золота</div>
        <div className="text-4xl font-black text-amber-500 flex justify-center items-center gap-2">
          {state.gold} <span className="text-2xl">💰</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">Тратьте золото на реальные награды в оффлайне!</p>
      </div>

      <div className="space-y-8">
        {categories.map(cat => {
          const items = GameConfig.REWARDS.filter(r => r.category === cat.key);
          if(items.length === 0) return null;
          
          return (
            <div key={cat.key}>
              <h3 className="font-bold text-lg mb-3 px-1">{cat.label}</h3>
              <div className="space-y-3">
                {items.map(reward => {
                  const canAfford = state.gold >= reward.cost;
                  return (
                    <div key={reward.id} className={`glass - panel p - 4 rounded - 2xl flex gap - 4 items - center ${ !canAfford ? 'opacity-50 grayscale select-none' : '' } `}>
                      <div className="text-3xl shrink-0">{reward.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-white mb-0.5 truncate">{reward.title}</div>
                        <div className="text-xs text-slate-400 truncate mb-1.5">{reward.desc}</div>
                        <div className={`text - xs font - bold ${ canAfford ? 'text-amber-400' : 'text-slate-500' } `}>Стоимость: {reward.cost} 💰</div>
                      </div>
                      <button 
                        disabled={!canAfford}
                        onClick={() => {
                          const res = buyReward(reward.id);
                          if(res) setToast(`Куплено: ${ res.title } !Наслаждайтесь 🎉`);
                        }}
                        className={`shrink - 0 px - 4 py - 2 rounded - xl text - xs font - bold transition - transform active: scale - 95 ${ canAfford ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-slate-800 text-slate-500' } `}
                      >
                        {canAfford ? 'Купить' : 'Мало 💰'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      
    </motion.div>
  );
}
