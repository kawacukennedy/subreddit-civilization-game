import React from 'react';
import { t } from '../i18n';

interface DecisionPanelProps {
  eventTitle: string;
  eventBody: string;
  options: string[];
  onChoose: (option: string) => void;
  loading?: boolean;
}

export const DecisionPanel: React.FC<DecisionPanelProps> = ({
  eventTitle,
  eventBody,
  options,
  onChoose,
  loading = false,
}) => {
  if (!options || options.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <p className="text-gray-700">{t('app.noEvent')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{eventTitle || t('app.dailyEvent')}</h2>
      <p className="text-gray-700 mb-6">{eventBody || 'An event is occurring.'}</p>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-3 text-white rounded disabled:opacity-50 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onPress={loading ? undefined : "chooseOption"}
            data={{ option }}
            disabled={!option || loading}
          >
            {loading ? 'Processing...' : (option || 'Option')}
          </button>
        ))}
      </div>
    </div>
  );
};