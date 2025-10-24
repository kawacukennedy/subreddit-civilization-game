import React, { useState } from 'react';
import { ResponsiveLayout } from './components/ResponsiveLayout';
import { SplashScreen } from './components/SplashScreen';
import { DecisionPanel } from './components/DecisionPanel';
import { Leaderboard } from './components/Leaderboard';
import { EventHistory } from './components/EventHistory';
import { CivilizationStats } from './components/CivilizationStats';
import { EraProgress } from './components/EraProgress';
import { Achievements } from './components/Achievements';
import { HelpTutorial } from './components/HelpTutorial';
import { Settings } from './components/Settings';
import { Notification } from './components/Notification';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useNotifications } from './hooks/useNotifications';

export const App: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();

  // Mock data - in production, this would be fetched from backend
  const mockCivilizations = [
    { name: 'MemeNation', population: 1000, food: 500, morale: 80, defense: 200, tech: 150 },
    { name: 'TechReign', population: 800, food: 600, morale: 90, defense: 250, tech: 200 },
  ];

  const mockCurrentCiv = {
    name: 'TestSubreddit',
    era: 2,
    population: 1500,
    resources: { food: 75, culture: 60, defense: 80, technology: 45 },
    morale: 85,
    status: 'active',
    subreddit: 'r/test',
    decisions: 7,
  };

  const mockEvents = [
    { id: '1', description: 'Famine hits the lands', outcome: 'Shared food, morale +10', date: '2025-01-01' },
    { id: '2', description: 'Technological breakthrough', outcome: 'New invention discovered, technology +15', date: '2025-01-02' },
  ];

  const mockAchievements = [
    { id: 'first_decision', name: 'First Steps', description: 'Made your first decision', icon: '🎯', unlocked: true },
    { id: 'era_advancement', name: 'Era Changer', description: 'Advanced to a new era', icon: '⏫', unlocked: true },
    { id: 'resource_master', name: 'Resource Master', description: 'Maintain all resources above 50', icon: '📊', unlocked: false },
    { id: 'community_leader', name: 'Community Leader', description: 'Lead your subreddit to victory', icon: '👑', unlocked: false },
  ];

  return (
    <ErrorBoundary>
      <ResponsiveLayout>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Subreddit Civilization</h1>
          <div className="space-x-2">
            <button
              onClick={() => setShowSettings(true)}
              className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
            >
              Settings
            </button>
            <button
              onClick={() => setShowTutorial(true)}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              Help
            </button>
          </div>
        </div>

        <CivilizationStats civilization={mockCurrentCiv} />
        <EraProgress currentEra={mockCurrentCiv.era} decisionsInEra={mockCurrentCiv.decisions % 5} decisionsNeeded={5} />

        <DecisionPanel
          eventTitle="Daily Event"
          eventBody="A drought has affected your water supply. What do you do?"
          options={['Build irrigation systems', 'Ration water carefully', 'Seek help from allies']}
          onChoose={(option) => {
            addNotification(`Choice made: ${option}`, 'success');
            // Handle choice - in production, this would trigger backend action
          }}
          loading={false}
        />

        <Achievements achievements={mockAchievements} />
        <Leaderboard civilizations={mockCivilizations} />
        <EventHistory events={mockEvents} />
      </ResponsiveLayout>

      {showTutorial && <HelpTutorial onClose={() => setShowTutorial(false)} />}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}

      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </ErrorBoundary>
  );
};