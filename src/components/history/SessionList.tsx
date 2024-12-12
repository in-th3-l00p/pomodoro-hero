import React from 'react';
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery';
import { Timer, Coffee } from 'lucide-react';
import { formatDuration } from '../../utils/timeUtils';

interface SessionListProps {
  userId?: string;
  selectedDate: Date | null;
}

const SessionList: React.FC<SessionListProps> = ({ userId, selectedDate }) => {
  const { sessions, loading } = useFirestoreQuery(userId, selectedDate);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No sessions found for this period.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {session.sessionType === 'work' ? (
                <Timer className="w-5 h-5 text-indigo-600" />
              ) : (
                <Coffee className="w-5 h-5 text-green-600" />
              )}
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {session.sessionName || `${session.sessionType === 'work' ? 'Work' : 'Break'} Session`}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(session.startedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {formatDuration(session.durationSeconds)}
              </p>
              <p className="text-sm text-gray-500">
                {session.status}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionList;