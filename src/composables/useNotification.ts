import { ref } from 'vue';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timeout?: number;
}

const notifications = ref<Notification[]>([]);

export const useNotification = () => {
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = {
      id,
      ...notification,
    };
    
    notifications.value.push(newNotification);
    
    if (notification.timeout !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.timeout || 5000);
    }
    
    return id;
  };
  
  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };
  
  const clearNotifications = () => {
    notifications.value = [];
  };
  
  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
};
