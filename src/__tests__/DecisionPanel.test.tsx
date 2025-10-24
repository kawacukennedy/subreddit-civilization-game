import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DecisionPanel } from '../components/DecisionPanel';

describe('DecisionPanel', () => {
  it('should render options', () => {
    render(
      <DecisionPanel
        eventTitle="Test Event"
        eventBody="Test body"
        options={['Option 1', 'Option 2']}
        onChoose={() => {}}
      />
    );

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(
      <DecisionPanel
        eventTitle="Test Event"
        eventBody="Test body"
        options={['Option 1']}
        onChoose={() => {}}
        loading={true}
      />
    );

    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('should show no event message when no options', () => {
    render(
      <DecisionPanel
        eventTitle="Test Event"
        eventBody="Test body"
        options={[]}
        onChoose={() => {}}
      />
    );

    expect(screen.getByText('No active event. Check back later!')).toBeInTheDocument();
  });
});