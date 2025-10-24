export interface Event {
  id: string;
  type: string;
  description: string;
  options: {
    text: string;
    effect: (civ: Civilization) => void;
  }[];
  trigger_condition: (civ: Civilization) => boolean;
}

import { Civilization } from './civilization.spec';