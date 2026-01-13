import { useEffect, useRef } from 'react';

export const useNotifications = () => {
  const permissionGranted = useRef(false);

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        permissionGranted.current = true;
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          permissionGranted.current = permission === 'granted';
        });
      }
    }
  }, []);

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (permissionGranted.current && document.hidden) {
      new Notification(title, {
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        ...options,
      });
    }
  };

  return { showNotification };
};
