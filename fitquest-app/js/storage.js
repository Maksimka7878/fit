// LocalStorage wrapper — FitQuest SaaS
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
    },

    getQuestsState() {
        const data = localStorage.getItem(this.KEYS.QUESTS);
        return data ? JSON.parse(data) : null;
    },
    saveQuestsState(quests) {
        localStorage.setItem(this.KEYS.QUESTS, JSON.stringify(quests));
    },

    getLastLoginDate() {
        return localStorage.getItem(this.KEYS.LAST_LOGIN);
    },
    setLastLoginDate(dateString) {
        localStorage.setItem(this.KEYS.LAST_LOGIN, dateString);
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
    }
};
