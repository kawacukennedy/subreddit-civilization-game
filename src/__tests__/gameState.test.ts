import { describe, it, expect } from 'vitest';
import { updateResources, advanceEra, checkWinCondition, initialCivilization } from '../state/gameState';

describe('gameState', () => {
  it('should update resources correctly', () => {
    const civ = { ...initialCivilization };
    const updated = updateResources(civ, { food: 10, culture: 5 });
    expect(updated.resources.food).toBe(60);
    expect(updated.resources.culture).toBe(25);
  });

  it('should advance era', () => {
    const civ = { ...initialCivilization };
    const updated = advanceEra(civ);
    expect(updated.era).toBe(2);
  });

  it('should check win condition', () => {
    const civ = { ...initialCivilization, resources: { ...initialCivilization.resources, culture: 150, technology: 150 } };
    expect(checkWinCondition(civ)).toBe(true);
  });
});