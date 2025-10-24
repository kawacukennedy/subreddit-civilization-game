import { Event } from './event.spec';
import { Civilization } from './civilization.spec';

export const events: Event[] = [
  {
    id: 'famine',
    type: 'Resource Management',
    description: 'A famine has struck your lands. Food supplies are dwindling.',
    options: [
      {
        text: 'Share food with allies',
        effect: (civ: Civilization) => {
          civ.resources.food -= 15;
          civ.morale += 10;
        },
      },
      {
        text: 'Conserve resources',
        effect: (civ: Civilization) => {
          civ.resources.food += 5;
          civ.morale -= 5;
        },
      },
      {
        text: 'Trade for food',
        effect: (civ: Civilization) => {
          civ.resources.food += 10;
          civ.resources.culture -= 5;
        },
      },
    ],
    trigger_condition: (civ: Civilization) => civ.resources.food < 30,
  },
  {
    id: 'invasion',
    type: 'Political Events',
    description: 'Barbarians are invading! Prepare your defenses.',
    options: [
      {
        text: 'Fortify defenses',
        effect: (civ: Civilization) => {
          civ.resources.defense += 10;
          civ.resources.food -= 5;
        },
      },
      {
        text: 'Negotiate peace',
        effect: (civ: Civilization) => {
          civ.morale += 5;
          civ.resources.culture -= 10;
        },
      },
    ],
    trigger_condition: (civ: Civilization) => Math.random() < 0.3, // random
  },
  // Add more events
];

export const getRandomEvent = (civ: Civilization): Event | null => {
  const available = events.filter(e => e.trigger_condition(civ));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
};