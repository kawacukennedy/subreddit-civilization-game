import React from 'react';
import { ResponsiveLayout } from './components/ResponsiveLayout';
import { SplashScreen } from './components/SplashScreen';
import { DecisionPanel } from './components/DecisionPanel';
import { Leaderboard } from './components/Leaderboard';
import { EventHistory } from './components/EventHistory';

export const App: React.FC = () => {
  // Mock data
  const mockCivilizations = [
    { name: 'MemeNation', population: 1000, food: 500, morale: 80, defense: 200, tech: 150 },
    { name: 'TechReign', population: 800, food: 600, morale: 90, defense: 250, tech: 200 },
  ];

  const mockEvents = [
    { id: '1', description: 'Famine hits the lands', outcome: 'Shared food, morale +10', date: '2025-10-24' },
  ];

  return (
    <ResponsiveLayout>
      <SplashScreen />
      <DecisionPanel
        eventTitle="Daily Event"
        eventBody="A drought has affected your crops. What do you do?"
        options={['Conserve water', 'Trade for food', 'Pray for rain']}
        onChoose={(option) => console.log('Chose:', option)}
      />
      <Leaderboard civilizations={mockCivilizations} />
      <EventHistory events={mockEvents} />
    </ResponsiveLayout>
  );
};