import { describe, it, expect } from 'vitest';
import { getRandomEvent } from '../../.kiro/specs/events';

describe('events', () => {
  it('should return an event or null', () => {
    const civ = { resources: { food: 50 }, morale: 50 };
    const event = getRandomEvent(civ);
    expect(event === null || typeof event.id === 'string').toBe(true);
  });
});