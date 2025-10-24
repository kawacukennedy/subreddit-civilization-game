import { Devvit, Context } from '@devvit/public-api';
import { Civilization } from '../.kiro/specs/civilization.spec';
import { Event, getRandomEvent } from '../.kiro/specs/events';
import { generateNarrative } from '../.kiro/specs/narrative.spec';
import { adjustDifficulty } from '../.kiro/steering/balance.steer';
import { onNewTurn } from '../.kiro/hooks/onNewTurn.hook';
import { onUserVote } from '../.kiro/hooks/onUserVote.hook';
import { onEraChange } from '../.kiro/hooks/onEraChange.hook';

export const getCivilizations = async (context: Context): Promise<Civilization[]> => {
  const keys = await context.kvStore.list();
  const civilizations: Civilization[] = [];
  for (const key of keys) {
    if (key.startsWith('civ_')) {
      const civ = await context.kvStore.get(key);
      if (civ) civilizations.push(civ);
    }
  }
  return civilizations;
};

export const getCurrentCivilization = async (context: Context): Promise<Civilization | null> => {
  const subreddit = context.subreddit?.name || 'default';
  const key = `civ_${subreddit}`;
  return await context.kvStore.get(key) || null;
};

export const saveCivilization = async (context: Context, civ: Civilization): Promise<void> => {
  const key = `civ_${civ.subreddit}`;
  await context.kvStore.put(key, civ);
};

export const getCurrentEvent = async (context: Context): Promise<Event | null> => {
  const subreddit = context.subreddit?.name || 'default';
  const key = `event_${subreddit}`;
  return await context.kvStore.get(key) || null;
};

export const generateNewEvent = async (context: Context): Promise<void> => {
  const civ = await getCurrentCivilization(context);
  if (!civ) return;
  await generateNewEventForCiv(context, civ);
};

export const generateNewEventForCiv = async (context: Context, civ: Civilization): Promise<void> => {
  // For scheduler, no post, so default difficulty
  const difficulty = 'medium'; // or calculate based on something
  const event = getRandomEvent(civ);
  if (event) {
    const key = `event_${civ.subreddit}`;
    await context.kvStore.put(key, event);
  }
};

export const postDecision = async (context: Context, decision: string): Promise<void> => {
  onUserVote(decision);
  const civ = await getCurrentCivilization(context);
  const event = await getCurrentEvent(context);
  if (!civ || !event) return;

  const option = event.options.find(o => o.text === decision);
  if (option) {
    option.effect(civ);
    civ.decisions += 1;
    if (civ.decisions >= 5 && civ.era < 5) {
      civ.era += 1;
      onEraChange(civ.era);
      civ.decisions = 0;
    }
    await saveCivilization(context, civ);
    // Generate narrative
    const narrative = generateNarrative({
      era: getEraName(civ.era),
      event: event.description,
      choice: decision,
    });
    const post = await context.reddit.getCurrentPost();
    await context.reddit.submitComment({
      id: post.id,
      text: narrative.description,
    });
    // Clear current event
    const key = `event_${civ.subreddit}`;
    await context.kvStore.delete(key);
  }
};

const getEraName = (era: number): string => {
  const eras = ['Stone', 'Bronze', 'Iron', 'Medieval', 'Modern'];
  return eras[era - 1] || 'Unknown';
};

const calculateScore = (civ: Civilization): number => {
  return civ.resources.culture + civ.resources.technology + civ.resources.defense + civ.morale;
};

export const updateLeaderboard = async (context: Context): Promise<void> => {
  const civilizations = await getCivilizations(context);
  civilizations.sort((a, b) => calculateScore(b) - calculateScore(a));
  await context.kvStore.put('leaderboard', civilizations.slice(0, 10));
};

export const getLeaderboard = async (context: Context): Promise<Civilization[]> => {
  return await context.kvStore.get('leaderboard') || [];
};

export const advanceEra = async (context: Context): Promise<void> => {
  const civ = await getCurrentCivilization(context);
  if (!civ) return;
  if (civ.era < 5) { // max era
    civ.era += 1;
    onEraChange(civ.era);
    await saveCivilization(context, civ);
  }
  onNewTurn();
  await generateNewEvent(context);
};