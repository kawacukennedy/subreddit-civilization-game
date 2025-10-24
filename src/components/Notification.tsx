import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Allow fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg border-l-4 shadow-lg transition-all duration-300 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      } ${getTypeStyles()}`}
      style={{ maxWidth: '400px' }}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};