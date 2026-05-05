import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notifications', {
    state: () => ({
        notifications: []
    }),

    actions: {
        add(notification) {
            this.notifications.unshift({
                id: Date.now(),
                read: false,
                ...notification
            })
        },

        markAsRead(id) {
            const n = this.notifications.find(n => n.id === id)
            if (n) n.read = true
        },

        clear() {
            this.notifications = []
        }
    }
})