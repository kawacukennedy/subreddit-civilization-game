import React, { useState } from 'react';
import { t, setLocale, getAvailableLocales } from '../i18n';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [selectedLocale, setSelectedLocale] = useState('en');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale);
    setLocale(locale as any);
  };

  const handleSave = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('subreddit-civ-settings', JSON.stringify({
      locale: selectedLocale,
      notifications: notificationsEnabled,
      sound: soundEnabled,
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={selectedLocale}
              onChange={(e) => handleLocaleChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {getAvailableLocales().map((locale) => (
                <option key={locale} value={locale}>
                  {locale === 'en' ? 'English' : locale === 'fr' ? 'Français' : 'Español'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
            </label>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="mr-2"
                disabled
              />
              <span className="text-sm font-medium text-gray-700">Enable Sound Effects (Coming Soon)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};