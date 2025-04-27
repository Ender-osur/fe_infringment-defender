import { ref } from 'vue'

interface Notification {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  id: number
}

// Create a reactive notification store
const notifications = ref<Notification[]>([])
let nextId = 0

export function useNotification() {
  // Add a new notification
  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration = 3000
  ) => {
    const id = nextId++

    // Add notification to the array
    notifications.value.push({
      message,
      type,
      id
    })

    // Remove notification after duration
    setTimeout(() => {
      removeNotification(id)
    }, duration)

    return id
  }

  // Remove a notification by ID
  const removeNotification = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  // Clear all notifications
  const clearNotifications = () => {
    notifications.value = []
  }

  return {
    notifications,
    showNotification,
    removeNotification,
    clearNotifications
  }
}
