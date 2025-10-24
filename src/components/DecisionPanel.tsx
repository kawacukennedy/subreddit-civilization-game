import React from 'react';

interface DecisionPanelProps {
  eventTitle: string;
  eventBody: string;
  options: string[];
  onChoose: (option: string) => void;
}

export const DecisionPanel: React.FC<DecisionPanelProps> = ({
  eventTitle,
  eventBody,
  options,
  onChoose,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{eventTitle}</h2>
      <p className="text-gray-700 mb-6">{eventBody}</p>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded"
            onPress="chooseOption"
            data={{ option }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};