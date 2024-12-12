import React from 'react';
import { Timer, Coffee } from 'lucide-react';
import type { SessionRecord } from '../../types/timer';
import { formatDuration } from '../../utils/timeUtils';

interface SessionCardProps {
  session: SessionRecord;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const Icon = session.sessionType === 'work' ? Timer : Coffee;
  const iconColor = session.sessionType === 'work' ? 'text-indigo-600' : 'text-green-600';
  const formattedDate = new Date(session.startedAt).toLocaleString();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {session.sessionName || `${session.sessionType === 'work' ? 'Work' : 'Break'} Session`}
            </h3>
            <p className="text-sm text-gray-500">{formattedDate}</p>
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
  );
}

export default SessionCard;