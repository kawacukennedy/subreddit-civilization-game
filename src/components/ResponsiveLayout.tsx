import React, { useState } from 'react';
import { t } from '../i18n';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('app.title')}</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {darkMode ? t('app.lightMode') : t('app.darkMode')}
        </button>
      </header>
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </main>
    </div>
  );
};