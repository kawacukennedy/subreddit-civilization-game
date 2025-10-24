import { describe, it, expect, vi } from 'vitest';
import { calculateScore, getEraName } from '../backend';

describe('backend', () => {
  it('should calculate score correctly', () => {
    const civ = {
      resources: { culture: 10, technology: 20, defense: 5 },
      morale: 15,
    };
    expect(calculateScore(civ as any)).toBe(50);
  });

  it('should get era name', () => {
    expect(getEraName(1)).toBe('Stone');
    expect(getEraName(2)).toBe('Bronze');
    expect(getEraName(6)).toBe('Unknown');
  });
});