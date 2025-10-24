import React from 'react';
import { ResponsiveLayout } from './components/ResponsiveLayout';
import { SplashScreen } from './components/SplashScreen';
import { DecisionPanel } from './components/DecisionPanel';
import { Leaderboard } from './components/Leaderboard';
import { EventHistory } from './components/EventHistory';
import { ErrorBoundary } from './components/ErrorBoundary';

export const App: React.FC = () => {
  // Mock data - in production, this would be fetched from backend
  const mockCivilizations = [
    { name: 'MemeNation', population: 1000, food: 500, morale: 80, defense: 200, tech: 150 },
    { name: 'TechReign', population: 800, food: 600, morale: 90, defense: 250, tech: 200 },
  ];

  const mockEvents = [
    { id: '1', description: 'Famine hits the lands', outcome: 'Shared food, morale +10', date: '2025-01-01' },
  ];

  return (
    <ErrorBoundary>
      <ResponsiveLayout>
        <SplashScreen />
        <DecisionPanel
          eventTitle="Daily Event"
          eventBody="A drought has affected your water supply. What do you do?"
          options={['Build irrigation systems', 'Ration water carefully', 'Seek help from allies']}
          onChoose={(option) => {
            // Handle choice - in production, this would trigger backend action
          }}
          loading={false}
        />
        <Leaderboard civilizations={mockCivilizations} />
        <EventHistory events={mockEvents} />
      </ResponsiveLayout>
    </ErrorBoundary>
  );
};