import React from 'react';
import { t } from '../i18n';

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
      <h3 className="text-xl font-bold mb-4">{t('app.eventHistory')}</h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {events.length > 0 ? events.map((event) => (
          <div key={event.id} className="p-3 bg-white rounded shadow">
            <p className="font-semibold">{event.description}</p>
            <p className="text-gray-600">{event.outcome}</p>
            <p className="text-xs text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
          </div>
        )) : <p>{t('app.noEvents')}</p>}
      </div>
    </div>
  );
};