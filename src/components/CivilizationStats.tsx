import React from 'react';
import { t } from '../i18n';

interface Civilization {
  name: string;
  era: number;
  population: number;
  resources: {
    food: number;
    culture: number;
    defense: number;
    technology: number;
  };
  morale: number;
  status: string;
  subreddit: string;
  decisions: number;
}

interface CivilizationStatsProps {
  civilization: Civilization;
}

export const CivilizationStats: React.FC<CivilizationStatsProps> = ({ civilization }) => {
  const getEraName = (era: number) => {
    const eras = [t('eras.Stone'), t('eras.Bronze'), t('eras.Iron'), t('eras.Medieval'), t('eras.Modern')];
    return eras[era - 1] || t('eras.Stone');
  };

  const getResourceColor = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const ResourceBar: React.FC<{ label: string; value: number; max?: number }> = ({ label, value, max = 100 }) => (
    <div className="mb-2">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getResourceColor(value, max)}`}
          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4">{civilization.name}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Era: {getEraName(civilization.era)}</p>
          <p className="text-sm text-gray-600 mb-2">Population: {civilization.population}</p>
          <p className="text-sm text-gray-600 mb-4">Morale: {civilization.morale}/100</p>
          <ResourceBar label="Food" value={civilization.resources.food} />
          <ResourceBar label="Culture" value={civilization.resources.culture} />
        </div>
        <div>
          <ResourceBar label="Defense" value={civilization.resources.defense} />
          <ResourceBar label="Technology" value={civilization.resources.technology} />
          <div className="mt-4">
            <p className="text-sm text-gray-600">Decisions Made: {civilization.decisions}</p>
            <p className="text-sm text-gray-600">Status: {civilization.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};