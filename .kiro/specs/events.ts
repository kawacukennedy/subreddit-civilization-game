import { Event } from './event.spec';
import { Civilization } from './civilization.spec';
import specs from '../../specs.json';

const parseEffect = (effectString: string) => (civ: Civilization) => {
  const statements = effectString.split(',').map(s => s.trim());
  for (const stmt of statements) {
    const match = stmt.match(/(\w+)\s*([+-]?=)\s*(\d+)/);
    if (match) {
      const [, key, op, valStr] = match;
      const val = parseInt(valStr);
      if (op === '+=') {
        if (key in civ.resources) {
          (civ.resources as any)[key] += val;
        } else if (key === 'morale') {
          civ.morale += val;
        } else if (key === 'population') {
          civ.population += val;
        }
      } else if (op === '-=') {
        if (key in civ.resources) {
          (civ.resources as any)[key] -= val;
        } else if (key === 'morale') {
          civ.morale -= val;
        } else if (key === 'population') {
          civ.population -= val;
        }
      }
    }
  }
};

const parseTrigger = (trigger: string) => {
  const code = trigger.replace(/random/g, 'globalThis.Math.random()').replace(/and/g, '&&').replace(/or/g, '||').replace(/food/g, 'civ.resources.food').replace(/culture/g, 'civ.resources.culture').replace(/defense/g, 'civ.resources.defense').replace(/technology/g, 'civ.resources.technology').replace(/morale/g, 'civ.morale').replace(/population/g, 'civ.population').replace(/era/g, 'civ.era');
  return (civ: Civilization) => {
    const { resources, morale, population, era } = civ;
    return eval(code.replace(/civ\./g, ''));
  };
};

export const events: Event[] = specs.events.map(e => ({
  id: e.id,
  type: e.type,
  description: e.description,
  options: e.options.map(o => ({
    text: o.text,
    effect: parseEffect(o.effect)
  })),
  trigger_condition: parseTrigger(e.trigger)
}));

export const getRandomEvent = (civ: Civilization): Event | null => {
  const available = events.filter(e => e.trigger_condition(civ));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
};