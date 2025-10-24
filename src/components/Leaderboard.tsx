import React from 'react';
import { motion } from 'framer-motion';

interface Civilization {
  name: string;
  population: number;
  food: number;
  morale: number;
  defense: number;
  tech: number;
}

interface LeaderboardProps {
  civilizations: Civilization[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ civilizations }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Leaderboard</h3>
      <div className="space-y-2">
        {civilizations.map((civ, index) => (
          <motion.div
            key={civ.name}
            className="flex justify-between items-center p-3 bg-white rounded shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="font-semibold">{civ.name}</span>
            <div className="flex space-x-4 text-sm">
              <span>Pop: {civ.population}</span>
              <span>Food: {civ.food}</span>
              <span>Morale: {civ.morale}</span>
              <span>Defense: {civ.defense}</span>
              <span>Tech: {civ.tech}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};