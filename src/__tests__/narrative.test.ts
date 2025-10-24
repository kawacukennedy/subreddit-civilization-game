import { describe, it, expect } from 'vitest';
import { generateNarrative } from '../../.kiro/specs/narrative.spec';

describe('narrative', () => {
  it('should generate narrative for Bronze famine', () => {
    const input = { era: 'Bronze', event: 'A famine has struck your lands. Food supplies are dwindling.', choice: 'Share food with allies' };
    const output = generateNarrative(input);
    expect(output.description).toContain('generosity');
  });
});