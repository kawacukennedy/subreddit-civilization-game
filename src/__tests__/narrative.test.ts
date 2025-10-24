import { describe, it, expect } from 'vitest';
import { generateNarrative } from '../../.kiro/specs/narrative.spec';

describe('narrative', () => {
  it('should generate narrative for Bronze famine', () => {
    const input = { era: 'Bronze', event: 'Famine hits your lands', choice: 'Share food with others' };
    const output = generateNarrative(input);
    expect(output.description).toContain('generosity');
  });
});