# Subreddit Civilization

A massively multiplayer strategy and social simulation game where Redditors collectively build, expand, and compete as civilizations through daily decisions and community-driven gameplay on Reddit Interactive Posts.

## Features

- **Multiplayer Gameplay**: Each subreddit represents a civilization with unique resources and progress.
- **Daily Decisions**: Community votes determine civilization outcomes via majority choice.
- **Resource Management**: Balance food, culture, defense, technology, and morale.
- **Era Progression**: Advance from Stone Age to Modern Era through strategic choices.
- **Event System**: Dynamic events with procedural narratives and multiple outcomes.
- **Leaderboards**: Real-time ranking of civilizations by prosperity score.
- **Kiro Integration**: Automated game balancing, event generation, and workflow management.

## Tech Stack

- **Frontend**: Devvit Web (React + TypeScript + TailwindCSS + Framer Motion)
- **Backend**: Devvit Cloud Runtime + Reddit API + Key-Value Store
- **Automation**: Kiro (Specs, Hooks, Steering, Automation)
- **Version Control**: GitHub

## Project Structure

```
subreddit-civilization/
├── .kiro/                    # Kiro automation and specs
│   ├── specs/               # Data models and event definitions
│   ├── hooks/               # Automation hooks
│   ├── steering/            # Dynamic balance adjustments
│   └── automation/          # Deployment scripts
├── src/
│   ├── components/          # React UI components
│   ├── state/               # Game state management
│   ├── backend.ts           # Server-side logic
│   ├── main.tsx             # Devvit app entry
│   └── __tests__/           # Unit tests
├── package.json
├── devvit.yaml
├── tailwind.config.js
└── README.md
```

## Setup and Installation

1. **Prerequisites**:
   - Node.js v22+
   - Devvit CLI: `npm install -g @devvit/cli`
   - Reddit Developer Account

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/kawacukennedy/subreddit-civilization-game.git
   cd subreddit-civilization
   ```

3. **Install Dependencies**:
   ```bash
   yarn install
   ```

4. **Configure Devvit**:
   - Run `devvit login` to authenticate with Reddit
   - Update `devvit.yaml` with your app details

5. **Development**:
   ```bash
   yarn dev
   ```

6. **Testing**:
   ```bash
   yarn test
   ```

7. **Linting**:
   ```bash
   yarn lint
   ```

## Deployment

### Prerequisites

- Reddit Developer Account
- Devvit CLI authenticated: `devvit login`
- App registered in Reddit Developer Portal

### Steps

1. **Build the App**:
   ```bash
   yarn build
   ```

2. **Deploy to Reddit**:
   ```bash
   devvit deploy
   ```
   This uploads the app to Reddit's servers.

3. **Create Interactive Post**:
   - Go to [Reddit Developer Portal](https://developers.reddit.com)
   - Select your app
   - Create a new post or update existing one
   - Enable interactive features
   - Publish the post

4. **Test the App**:
   - Visit the post on Reddit
   - Interact with buttons to test functionality
   - Check comments for game updates

### Demo Setup

To create a demo for r/GameOnReddit:

1. Deploy the app as above
2. Create a post titled "Subreddit Civilization - Multiplayer Strategy Game"
3. Include description: "Build and compete as civilizations through community decisions!"
4. Share the post link in submission

### Troubleshooting

- **Authentication Issues**: Ensure `devvit login` is run
- **Build Errors**: Check Node.js version (v22+)
- **Runtime Errors**: Check Reddit API permissions
- **Interactive Elements Not Working**: Verify post is published and app is deployed

### Monitoring

- Use Reddit Developer Portal to monitor app usage
- Check logs in Devvit CLI: `devvit logs`
- Update app version for bug fixes: increment version in package.json

## Kiro Integration

Kiro enhances development with:

- **Specs**: Define civilization and event data models
- **Hooks**: Automate turn processing and event generation
- **Steering**: Adjust difficulty based on engagement metrics
- **Automation**: Schedule daily updates and backups

See `.kiro/` directory for implementation details.

## Gameplay

1. **Start Civilization**: Click "Start Civilization" to initialize your subreddit's civ
2. **Daily Events**: Vote on decisions via interactive buttons
3. **Majority Rules**: Outcomes determined by community majority
4. **Progress**: Accumulate decisions to advance eras
5. **Win**: Achieve highest prosperity score after all eras

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## API Reference

### Backend Functions

- `getCivilizations(context)`: Retrieve all civilizations
- `postDecision(context, decision)`: Submit a vote for current event
- `updateLeaderboard(context)`: Update and sort leaderboard
- `advanceEra(context)`: Manually advance era (admin function)

### Kiro Specs

- `Civilization`: Core game entity with resources and stats
- `Event`: Game events with options and effects
- `generateNarrative(input)`: Create procedural story outcomes

## Architecture

The app uses a modular architecture:

- **Frontend**: React components with Devvit Web
- **Backend**: Devvit runtime with Reddit API integration
- **Data**: Key-Value store for persistence
- **Automation**: Kiro for game logic and balancing

## Performance

- Event rendering: <100ms target
- Responsive design for mobile and desktop
- Optimized for Reddit's interactive posts

## Future Enhancements

- AI-powered event generation
- Cross-subreddit alliances
- Advanced resource trading
- Mobile app companion

## Support

For questions or issues:

- GitHub Issues: https://github.com/kawacukennedy/subreddit-civilization-game/issues
- Reddit Community: r/devvit or r/GameOnReddit

## Acknowledgments

Built for the Reddit GameOnReddit challenge using Devvit and Kiro.

## Contributors

- Kawacu Kennedy (Project Lead)

See CONTRIBUTING.md for how to join the team.