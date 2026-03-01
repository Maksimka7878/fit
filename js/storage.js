// LocalStorage wrapper with Vercel Cloud Sync — FitQuest SaaS
const StorageAPI = {
    KEYS: {
        GAME_STATE: 'fitquest_game_state',
        QUESTS: 'fitquest_quests_state',
        LAST_LOGIN: 'fitquest_last_login',
        USERNAME: 'fitquest_username',
    },

    getGameState() {
        const data = localStorage.getItem(this.KEYS.GAME_STATE);
        return data ? JSON.parse(data) : null;
    },
    saveGameState(state) {
        localStorage.setItem(this.KEYS.GAME_STATE, JSON.stringify(state));
        this.scheduleSync();
    },

    getQuestsState() {
        const data = localStorage.getItem(this.KEYS.QUESTS);
        return data ? JSON.parse(data) : null;
    },
    saveQuestsState(quests) {
        localStorage.setItem(this.KEYS.QUESTS, JSON.stringify(quests));
        this.scheduleSync();
    },

    getLastLoginDate() {
        return localStorage.getItem(this.KEYS.LAST_LOGIN);
    },
    setLastLoginDate(dateString) {
        localStorage.setItem(this.KEYS.LAST_LOGIN, dateString);
        this.scheduleSync();
    },

    getUsername() {
        return localStorage.getItem(this.KEYS.USERNAME);
    },
    saveUsername(name) {
        localStorage.setItem(this.KEYS.USERNAME, name);
    },
    setUsername(name) {   // legacy alias
        this.saveUsername(name);
    },

    clearAll() {
        Object.values(this.KEYS).forEach(k => localStorage.removeItem(k));
    },

    // --- Cloud Sync ---
    _syncTimer: null,
    scheduleSync() {
        if (this._syncTimer) clearTimeout(this._syncTimer);
        this._syncTimer = setTimeout(() => this.syncToCloud(), 1000);
    },

    async syncToCloud() {
        const username = this.getUsername();
        if (!username) return;

        const data = {
            gameState: this.getGameState(),
            quests: this.getQuestsState(),
            lastLogin: this.getLastLoginDate()
        };

        try {
            await fetch('/api/save-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, data })
            });
        } catch (e) {
            console.error('Failed to sync to cloud', e);
        }
    },

    async fetchFromCloud() {
        const username = this.getUsername();
        if (!username) return false;

        try {
            const res = await fetch(`/api/get-data?username=${encodeURIComponent(username)}`);
            if (res.ok) {
                const cloudData = await res.json();
                if (cloudData) {
                    if (cloudData.gameState) localStorage.setItem(this.KEYS.GAME_STATE, JSON.stringify(cloudData.gameState));
                    if (cloudData.quests) localStorage.setItem(this.KEYS.QUESTS, JSON.stringify(cloudData.quests));
                    if (cloudData.lastLogin) localStorage.setItem(this.KEYS.LAST_LOGIN, cloudData.lastLogin);
                    return true;
                }
            }
        } catch (e) {
            console.error('Failed to fetch from cloud', e);
        }
        return false;
    }
};
