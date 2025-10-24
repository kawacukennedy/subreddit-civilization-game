import React, { useState } from 'react';
import { t } from '../i18n';

interface HelpTutorialProps {
  onClose: () => void;
}

export const HelpTutorial: React.FC<HelpTutorialProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to Subreddit Civilization',
      content: 'Build and manage your subreddit civilization through daily community decisions. Make strategic choices to advance through eras and achieve prosperity.',
    },
    {
      title: 'Daily Events',
      content: 'Each day, face challenging events that affect your resources. Choose wisely - your decisions shape your civilization\'s future.',
    },
    {
      title: 'Resource Management',
      content: 'Balance Food, Culture, Defense, and Technology. Each resource is crucial for survival and advancement.',
    },
    {
      title: 'Era Progression',
      content: 'Make successful decisions to advance through Stone, Bronze, Iron, Medieval, and Modern eras. Each era brings new challenges and opportunities.',
    },
    {
      title: 'Community Voting',
      content: 'Your subreddit votes collectively. The majority choice determines the outcome each day.',
    },
    {
      title: 'Leaderboards',
      content: 'Compete with other subreddits. The highest prosperity scores win!',
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tutorial</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-center mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h3>
          <p className="text-gray-700">{steps[currentStep].content}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};