// Steering logic to adjust gameplay balance
export const adjustDifficulty = (upvotes: number) => {
  if (upvotes > 200) return 'hard';
  if (upvotes > 100) return 'medium';
  return 'easy';
};

export const adjustRewards = (difficulty: string, baseReward: number) => {
  const multipliers = { easy: 1.2, medium: 1.0, hard: 0.8 };
  return baseReward * (multipliers[difficulty as keyof typeof multipliers] || 1.0);
};