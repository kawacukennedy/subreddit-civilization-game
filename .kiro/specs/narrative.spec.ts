export interface NarrativeInput {
  era: string;
  event: string;
  choice: string;
}

export interface NarrativeOutput {
  description: string;
}

export const generateNarrative = (input: NarrativeInput): NarrativeOutput => {
  // Expanded procedural generation with variations
  const templates = {
    Stone: {
      'A famine has struck your lands. Food supplies are dwindling.': {
        'Share food with allies': [
          'Your selfless act inspires the tribe, boosting morale but straining supplies. Morale +10, Food -15.',
          'Generosity fosters alliances, though hunger looms. Morale +8, Food -12.',
        ],
        'Conserve resources': [
          'Prudent hoarding ensures survival, but discontent grows. Morale -5, Food +5.',
          'Strict rationing preserves food, yet grumbles echo. Morale -3, Food +7.',
        ],
        'Trade for food': [
          'A shrewd trade replenishes stores at the cost of cultural artifacts. Food +10, Culture -5.',
          'Bartering yields sustenance, but heritage fades. Food +12, Culture -4.',
        ],
      },
    },
    Bronze: {
      'A famine has struck your lands. Food supplies are dwindling.': {
        'Share food with allies': [
          'Your generosity brings joy to the people, but depletes your stores. Morale +10, Food -15.',
          'Altruism strengthens bonds, yet bellies ache. Morale +12, Food -13.',
        ],
        'Conserve resources': [
          'You hoard resources, leading to unrest. Morale -5, Food +5.',
          'Careful management averts crisis, but trust erodes. Morale -4, Food +6.',
        ],
        'Trade for food': [
          'Trade secures provisions, enriching merchants. Food +10, Culture -5.',
          'Commerce flourishes, but traditions wane. Food +9, Culture -6.',
        ],
      },
      'Barbarians are invading! Prepare your defenses.': {
        'Fortify defenses': [
          'Walls rise, repelling invaders at great cost. Defense +10, Food -5.',
          'Fortifications stand firm, safeguarding the realm. Defense +12, Food -4.',
        ],
        'Negotiate peace': [
          'Diplomacy prevails, avoiding bloodshed. Morale +5, Culture -10.',
          'Peace talks succeed, fostering understanding. Morale +6, Culture -8.',
        ],
      },
    },
    Iron: {
      'A festival is planned. How to celebrate?': {
        'Grand celebration': [
          'Spectacular festivities unite the people, draining resources. Culture +15, Food -10.',
          'Lavish rites elevate spirits, though supplies dwindle. Culture +17, Food -9.',
        ],
        'Modest event': [
          'Simple joys suffice, maintaining harmony. Culture +5, Morale +5.',
          'Humble gatherings strengthen community bonds. Culture +6, Morale +4.',
        ],
      },
    },
    Medieval: {
      'An inventor proposes a new technology.': {
        'Fund the invention': [
          'Innovation advances society, consuming resources. Technology +10, Food -5.',
          'Breakthroughs emerge, fueling progress. Technology +11, Food -6.',
        ],
        'Decline': [
          'Caution prevails, but potential is lost. Morale -5.',
          'Prudence over ambition dims hopes. Morale -4.',
        ],
      },
    },
    Modern: {
      'Another civilization offers an alliance.': {
        'Accept alliance': [
          'Unity bolsters defenses and spirits. Morale +10, Defense +5.',
          'Coalition enhances security and goodwill. Morale +9, Defense +6.',
        ],
        'Reject': [
          'Independence maintained, but isolation breeds discontent. Morale -5.',
          'Sovereignty upheld, yet loneliness sets in. Morale -4.',
        ],
      },
    },
  };

  const eraTemplates = templates[input.era as keyof typeof templates] || {};
  const eventTemplates = eraTemplates[input.event as keyof typeof eraTemplates] || {};
  const choiceTemplates = eventTemplates[input.choice as keyof typeof eventTemplates] || ['Outcome unknown.'];
  const outcome = Array.isArray(choiceTemplates) ? choiceTemplates[Math.floor(Math.random() * choiceTemplates.length)] : choiceTemplates;

  return { description: outcome };
};

  const eraTemplates = templates[input.era as keyof typeof templates] || {};
  const eventTemplates = eraTemplates[input.event as keyof typeof eraTemplates] || {};
  const outcome = eventTemplates[input.choice as keyof typeof eventTemplates] || 'Outcome unknown.';

  return { description: outcome };
};