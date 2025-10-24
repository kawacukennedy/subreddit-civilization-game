# Contributing to Subreddit Civilization

Thank you for your interest in contributing to Subreddit Civilization! This document provides guidelines for contributing to the project.

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

- Use the GitHub Issues tab to report bugs
- Include detailed steps to reproduce the issue
- Provide system information and error messages

### Suggesting Features

- Open a GitHub Issue with the "enhancement" label
- Describe the feature and its benefits
- Consider how it fits with the game's design

### Contributing Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `yarn test`
6. Run linting: `yarn lint`
7. Commit your changes: `git commit -m "Add feature: description"`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Open a Pull Request

### Development Setup

See the README.md for detailed setup instructions.

## Coding Standards

- Use TypeScript for all new code
- Follow the existing code style (enforced by ESLint)
- Write clear, concise commit messages
- Add JSDoc comments for new functions
- Keep functions small and focused

## Testing

- Write unit tests for all new features
- Ensure test coverage for critical paths
- Run tests before submitting PRs

## Documentation

- Update README.md for significant changes
- Add inline comments for complex logic
- Update this CONTRIBUTING.md if processes change

## Kiro Integration

When modifying Kiro components:

- Update specs for data model changes
- Test hooks thoroughly
- Document steering adjustments
- Ensure automation scripts are robust

## Review Process

- All PRs require review before merging
- Maintainers may request changes
- Be responsive to feedback
- Once approved, a maintainer will merge

## Recognition

Contributors will be acknowledged in the README.md and project releases.

Thank you for helping make Subreddit Civilization better!