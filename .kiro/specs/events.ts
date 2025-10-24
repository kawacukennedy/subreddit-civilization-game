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
    trigger_condition: (civ: Civilization) => Math.random() < 0.3,
  },
  {
    id: 'festival',
    type: 'Cultural Growth',
    description: 'A festival is planned. How to celebrate?',
    options: [
      {
        text: 'Grand celebration',
        effect: (civ: Civilization) => {
          civ.resources.culture += 15;
          civ.resources.food -= 10;
        },
      },
      {
        text: 'Modest event',
        effect: (civ: Civilization) => {
          civ.resources.culture += 5;
          civ.morale += 5;
        },
      },
    ],
    trigger_condition: (civ: Civilization) => civ.morale > 70,
  },
  {
    id: 'invention',
    type: 'Cultural Growth',
    description: 'An inventor proposes a new technology.',
    options: [
      {
        text: 'Fund the invention',
        effect: (civ: Civilization) => {
          civ.resources.technology += 10;
          civ.resources.food -= 5;
        },
      },
      {
        text: 'Decline',
        effect: (civ: Civilization) => {
          civ.morale -= 5;
        },
      },
    ],
    trigger_condition: (civ: Civilization) => civ.resources.technology < 50,
  },
  {
    id: 'alliance',
    type: 'Political Events',
    description: 'Another civilization offers an alliance.',
    options: [
      {
        text: 'Accept alliance',
        effect: (civ: Civilization) => {
          civ.morale += 10;
          civ.resources.defense += 5;
        },
      },
      {
        text: 'Reject',
        effect: (civ: Civilization) => {
          civ.morale -= 5;
        },
      },
    ],
    trigger_condition: (civ: Civilization) => Math.random() < 0.2,
  },
  {
    id: 'drought',
    type: 'Environmental Challenges',
    description: 'A drought affects your water supply.',
    options: [
      {
        text: 'Build irrigation',
        effect: (civ: Civilization) => {
          civ.resources.technology += 5;
          civ.resources.food -= 10;
        },
      },
      {
        text: 'Ration water',
        effect: (civ: Civilization) => {
          civ.resources.food -= 5;
          civ.morale -= 10;
        },
      },
    ],
    trigger_condition: (civ: Civilization) => Math.random() < 0.25,
  },
];

export const getRandomEvent = (civ: Civilization): Event | null => {
  const available = events.filter(e => e.trigger_condition(civ));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
};