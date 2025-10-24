import { useState, useCallback } from 'react';

interface NotificationItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = useCallback((message: string, type: NotificationItem['type'] = 'info') => {
    const id = Date.now().toString();
    const notification: NotificationItem = { id, message, type };
    setNotifications(prev => [...prev, notification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};