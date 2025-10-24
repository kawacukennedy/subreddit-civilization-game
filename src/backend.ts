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
  try {
    onUserVote(decision);
    const civ = await getCurrentCivilization(context);
    const event = await getCurrentEvent(context);
    if (!civ || !event) return;

    // Store vote instead of applying immediately
    const votesKey = `votes_${civ.subreddit}`;
    const votes = (await context.kvStore.get(votesKey)) || {};
    votes[decision] = (votes[decision] || 0) + 1;
    await context.kvStore.put(votesKey, votes);

    // Submit a comment for the vote
    const post = await context.reddit.getCurrentPost();
    await context.reddit.submitComment({
      id: post.id,
      text: `Vote cast for: ${decision}`,
    });
  } catch (error) {
    console.error('Error in postDecision:', error);
  }
};

export const getEraName = (era: number): string => {
  const eras = ['Stone', 'Bronze', 'Iron', 'Medieval', 'Modern'];
  return eras[era - 1] || 'Unknown';
};

export const calculateScore = (civ: Civilization): number => {
  return civ.resources.culture + civ.resources.technology + civ.resources.defense + civ.morale;
};

export const updateLeaderboard = async (context: Context): Promise<void> => {
  const civilizations = await getCivilizations(context);
  civilizations.sort((a, b) => calculateScore(b) - calculateScore(a));
  await context.kvStore.put('leaderboard', civilizations.slice(0, 10));

  // Check for winner
  const completed = civilizations.filter(civ => civ.era >= 5);
  if (completed.length > 0) {
    const winner = completed[0]; // highest score
    const post = await context.reddit.getCurrentPost();
    await context.reddit.submitComment({
      id: post.id,
      text: `🏆 Winner: ${winner.name} with score ${calculateScore(winner)}! Game over.`,
    });
    // Perhaps end the game or something
  }
};

export const getLeaderboard = async (context: Context): Promise<Civilization[]> => {
  return await context.kvStore.get('leaderboard') || [];
};

export const addToEventHistory = async (context: Context, subreddit: string, event: any): Promise<void> => {
  const key = `history_${subreddit}`;
  const history = (await context.kvStore.get(key)) || [];
  history.push(event);
  // Keep last 10
  if (history.length > 10) history.shift();
  await context.kvStore.put(key, history);
};

export const getEventHistory = async (context: Context, subreddit: string): Promise<any[]> => {
  const key = `history_${subreddit}`;
  return (await context.kvStore.get(key)) || [];
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

export const processTurnForCiv = async (context: Context, civ: Civilization): Promise<void> => {
  try {
    const votesKey = `votes_${civ.subreddit}`;
    const votes = await context.kvStore.get(votesKey);
    if (!votes || Object.keys(votes).length === 0) return; // no votes

    // Passive gains from upvotes (number of votes)
    const totalVotes = Object.values(votes).reduce((sum: number, count: number) => sum + count, 0);
    civ.resources.culture += Math.floor(totalVotes / 10); // example gain

    // Find majority choice
    const majorityChoice = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);

    const event = await getCurrentEvent(context);
    if (!event) return;

    const option = event.options.find(o => o.text === majorityChoice);
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
        choice: majorityChoice,
      });

      // Store in history
      await addToEventHistory(context, civ.subreddit, {
        id: Date.now().toString(),
        description: event.description,
        outcome: narrative.description,
        date: new Date().toISOString(),
      });

      const post = await context.reddit.getCurrentPost();
      await context.reddit.submitComment({
        id: post.id,
        text: `Majority choice: ${majorityChoice}. ${narrative.description}`,
      });
    }

    // Clear votes and event
    await context.kvStore.delete(votesKey);
    const eventKey = `event_${civ.subreddit}`;
    await context.kvStore.delete(eventKey);

    // Generate new event
    await generateNewEventForCiv(context, civ);
  } catch (error) {
    console.error('Error in processTurnForCiv:', error);
  }
};