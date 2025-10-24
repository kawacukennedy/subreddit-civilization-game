import { Devvit } from '@devvit/public-api';
import { App } from './App';
import { getCivilizations, postDecision, updateLeaderboard, advanceEra, getCurrentCivilization, getCurrentEvent, getLeaderboard, processTurnForCiv } from './backend';
import { initialCivilization } from './state/gameState';

Devvit.configure({
  redditAPI: true,
  kvStore: true,
});

Devvit.addCustomPostType({
  name: 'CivilizationGame',
  render: (context) => {
    return <App />;
  },
});

Devvit.addAction({
  name: 'chooseOption',
  description: 'Choose an option for the current event',
  handler: async (event, context) => {
    const decision = event.data?.option;
    if (decision) {
      await postDecision(context, decision);
    }
  },
});

Devvit.addAction({
  name: 'startCivilization',
  description: 'Start a new civilization for this subreddit',
  handler: async (event, context) => {
    const subreddit = context.subreddit?.name || 'default';
    const existing = await getCurrentCivilization(context);
    if (!existing) {
      const newCiv = { ...initialCivilization, name: subreddit, subreddit };
      await saveCivilization(context, newCiv);
      await generateNewEvent(context);
    }
  },
});

Devvit.addScheduler({
  name: 'dailyTurn',
  cron: '0 0 * * *', // daily at midnight
  onRun: async (event, context) => {
    const civilizations = await getCivilizations(context);
    for (const civ of civilizations) {
      await processTurnForCiv(context, civ);
    }
    await updateLeaderboard(context);
  },
});

Devvit.addMenuItem({
  label: 'Get Civilizations',
  location: 'post',
  onPress: getCivilizations,
});

Devvit.addMenuItem({
  label: 'Update Leaderboard',
  location: 'post',
  onPress: updateLeaderboard,
});

Devvit.addMenuItem({
  label: 'Advance Era',
  location: 'post',
  onPress: advanceEra,
});

export default Devvit;