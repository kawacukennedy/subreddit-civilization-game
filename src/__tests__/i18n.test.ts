import { describe, it, expect } from 'vitest';
import { t, setLocale } from '../i18n';

describe('i18n', () => {
  it('should translate keys', () => {
    setLocale('en');
    expect(t('app.title')).toBe('Subreddit Civilization');

    setLocale('fr');
    expect(t('app.title')).toBe('Civilisation des Subreddits');

    setLocale('es');
    expect(t('app.title')).toBe('Civilización de Subreddits');
  });

  it('should return key if not found', () => {
    expect(t('nonexistent.key')).toBe('nonexistent.key');
  });
});