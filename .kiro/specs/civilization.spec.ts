export interface Civilization {
  name: string;
  era: number;
  population: number;
  resources: {
    food: number;
    culture: number;
    defense: number;
    technology: number;
  };
  morale: number;
  status: string;
  subreddit: string;
  decisions: number;
}