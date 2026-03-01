// Simple local storage wrapper with cloud mock options for later
export const StorageAPI = {
    getGameState: () => {
        try {
            const data = localStorage.getItem('fitquest_state');
            return data ? JSON.parse(data) : null;
        } catch (e) { return null; }
    },
    saveGameState: (state) => {
        localStorage.setItem('fitquest_state', JSON.stringify(state));
    },
    getQuestsState: () => {
        try {
            const data = localStorage.getItem('fitquest_quests');
            return data ? JSON.parse(data) : null;
        } catch (e) { return null; }
    },
    saveQuestsState: (quests) => {
        localStorage.setItem('fitquest_quests', JSON.stringify(quests));
    },
    getUsername: () => {
        return localStorage.getItem('fitquest_username');
    },
    saveUsername: (name) => {
        localStorage.setItem('fitquest_username', name);
    },
    getLastLoginDate: () => {
        return localStorage.getItem('fitquest_lastLogin');
    },
    setLastLoginDate: (dateStr) => {
        localStorage.setItem('fitquest_lastLogin', dateStr);
    },

    fetchFromCloud: async () => {
        const user = localStorage.getItem('fitquest_username');
        if (!user) return false;
        try {
            const resp = await fetch(`/api/get-data?username=${encodeURIComponent(user)}`);
            if (resp.ok) {
                const data = await resp.json();
                if (data && data.state) {
                    localStorage.setItem('fitquest_state', JSON.stringify(data.state));
                    localStorage.setItem('fitquest_quests', JSON.stringify(data.quests));
                    return true;
                }
            }
        } catch (e) { console.error('Cloud fetch failed', e); }
        return false;
    },

    syncToCloud: async () => {
        const user = localStorage.getItem('fitquest_username');
        if (!user) return;
        const state = StorageAPI.getGameState();
        const quests = StorageAPI.getQuestsState();
        try {
            await fetch('/api/save-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user, state, quests }),
            });
        } catch (e) { console.error('Cloud sync failed', e); }
    }
};
