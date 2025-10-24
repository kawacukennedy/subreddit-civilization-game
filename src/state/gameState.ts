import { Civilization } from '../../.kiro/specs/civilization.spec';

export const initialCivilization: Civilization = {
  name: 'StarterCiv',
  era: 1,
  population: 100,
  resources: {
    food: 50,
    culture: 20,
    defense: 30,
    technology: 10,
  },
  morale: 50,
  status: 'active',
  subreddit: 'r/test',
  decisions: 0,
};

export const updateResources = (civ: Civilization, changes: Partial<Civilization['resources']>): Civilization => {
  return {
    ...civ,
    resources: {
      ...civ.resources,
      ...changes,
    },
  };
};

export const advanceEra = (civ: Civilization): Civilization => {
  return {
    ...civ,
    era: civ.era + 1,
  };
};

export const checkWinCondition = (civ: Civilization): boolean => {
  return civ.resources.culture > 100 && civ.resources.technology > 100;
};