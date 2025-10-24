import React from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 ${
              achievement.unlocked
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{achievement.icon}</span>
              <div>
                <h4 className={`font-semibold ${achievement.unlocked ? 'text-yellow-800' : 'text-gray-600'}`}>
                  {achievement.name}
                </h4>
                <p className={`text-sm ${achievement.unlocked ? 'text-yellow-700' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
              </div>
            </div>
            {!achievement.unlocked && (
              <div className="text-xs text-gray-400">Locked</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};