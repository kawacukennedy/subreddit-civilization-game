import React from 'react';

interface Event {
  id: string;
  description: string;
  outcome: string;
  date: string;
}

interface EventHistoryProps {
  events: Event[];
}

export const EventHistory: React.FC<EventHistoryProps> = ({ events }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Event History</h3>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="p-3 bg-white rounded shadow">
            <p className="font-semibold">{event.description}</p>
            <p className="text-gray-600">{event.outcome}</p>
            <p className="text-xs text-gray-400">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};