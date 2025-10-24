export interface NarrativeInput {
  era: string;
  event: string;
  choice: string;
}

export interface NarrativeOutput {
  description: string;
}

export const generateNarrative = (input: NarrativeInput): NarrativeOutput => {
  // Simple procedural generation
  const templates = {
    Bronze: {
      Famine: {
        'Share food': 'Your generosity brings joy to the people, but depletes your stores. Morale +10, Food -15.',
        'Conserve': 'You hoard resources, leading to unrest. Morale -5, Food +5.',
      },
    },
  };

  const eraTemplates = templates[input.era as keyof typeof templates] || {};
  const eventTemplates = eraTemplates[input.event as keyof typeof eraTemplates] || {};
  const outcome = eventTemplates[input.choice as keyof typeof eventTemplates] || 'Outcome unknown.';

  return { description: outcome };
};