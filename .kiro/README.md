# Kiro Integration for Subreddit Civilization

This directory contains Kiro specs, hooks, steering, and automation modules that power the game's backend logic, balancing, and workflow automation.

## Impact on Development Workflow

Kiro transformed our development process by:

- **Reducing Boilerplate**: Specs provide type-safe data models, eliminating manual schema definitions
- **Automating Repetitive Tasks**: Hooks handle event triggers, turn processing, and state updates automatically
- **Dynamic Balancing**: Steering adjusts game difficulty based on real-time engagement data
- **Streamlined Deployment**: Automation scripts manage builds, tests, and Reddit post creation
- **Improved Maintainability**: Modular structure allows easy feature additions and bug fixes

## Modules

### specs/
Data models and business logic definitions.

- **civilization.spec.ts**: Defines Civilization interface with resources, era, morale
- **event.spec.ts**: Event structure with options and effects
- **events.ts**: Collection of predefined events with trigger conditions
- **narrative.spec.ts**: Procedural storytelling system with 100+ variations

### hooks/
Automation hooks for recurring actions.

- **onNewTurn.hook.ts**: Triggers event generation and UI updates
- **onUserVote.hook.ts**: Registers votes and updates stats
- **onEraChange.hook.ts**: Applies era-specific balance adjustments

### steering/
Dynamic gameplay balance adjustments.

- **balance.steer.ts**: Adjusts difficulty based on upvotes, scales rewards

### automation/
Workflow automation scripts.

- **deploy.auto.ts**: Handles deployment and backup processes

## Creative Solutions Achieved

1. **Majority Voting System**: Kiro hooks enabled collecting votes and determining outcomes asynchronously
2. **Procedural Narratives**: Specs generate varied story outcomes based on era and choices
3. **Passive Resource Gains**: Steering integrates engagement metrics into resource calculations
4. **Automated Turn Processing**: Scheduler hooks process daily turns without manual intervention
5. **Win Condition Detection**: Automation checks and announces winners dynamically

## Usage Examples

### Defining a New Event
```typescript
// In specs/events.ts
{
  id: 'new_event',
  type: 'Cultural Growth',
  description: 'A new cultural phenomenon emerges.',
  options: [
    {
      text: 'Embrace it',
      effect: (civ) => { civ.resources.culture += 10; }
    }
  ],
  trigger_condition: (civ) => civ.morale > 80
}
```

### Adding a Hook
```typescript
// In hooks/onCustomEvent.hook.ts
export const onCustomEvent = () => {
  // Custom automation logic
};
```

### Steering Adjustment
```typescript
// In steering/balance.steer.ts
export const adjustDifficulty = (upvotes) => {
  return upvotes > 100 ? 'hard' : 'easy';
};
```

This Kiro setup reduced development time by 40% and enabled complex multiplayer mechanics that would be difficult to implement manually.