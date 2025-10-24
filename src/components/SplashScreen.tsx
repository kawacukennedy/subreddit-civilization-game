import React from 'react';
import { motion } from 'framer-motion';
import { t } from '../i18n';

export const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <motion.h1
        className="text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {t('app.title')}
      </motion.h1>
      <motion.button
        className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onPress="startCivilization"
      >
        {t('app.startCivilization')}
      </motion.button>
    </div>
  );
};