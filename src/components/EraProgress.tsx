import React from 'react';
import { t } from '../i18n';

interface EraProgressProps {
  currentEra: number;
  decisionsInEra: number;
  decisionsNeeded: number;
}

export const EraProgress: React.FC<EraProgressProps> = ({
  currentEra,
  decisionsInEra,
  decisionsNeeded,
}) => {
  const getEraName = (era: number) => {
    const eras = [t('eras.Stone'), t('eras.Bronze'), t('eras.Iron'), t('eras.Medieval'), t('eras.Modern')];
    return eras[era - 1] || t('eras.Stone');
  };

  const progress = Math.min((decisionsInEra / decisionsNeeded) * 100, 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-lg font-bold mb-4">Era Progress</h3>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>{getEraName(currentEra)}</span>
          <span>{decisionsInEra}/{decisionsNeeded} Decisions</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {currentEra < 5 && (
        <p className="text-sm text-gray-600">
          {decisionsNeeded - decisionsInEra} more decisions to advance to {getEraName(currentEra + 1)}
        </p>
      )}
      {currentEra === 5 && (
        <p className="text-sm text-green-600 font-semibold">
          Maximum era reached! Focus on prosperity.
        </p>
      )}
    </div>
  );
};