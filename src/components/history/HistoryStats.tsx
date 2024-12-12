import React from 'react';
import { Clock, CheckCircle2, Coffee } from 'lucide-react';
import { useHistoryStats } from '../../hooks/useHistoryStats';
import { formatDuration } from '../../utils/timeUtils';

interface HistoryStatsProps {
  userId?: string;
  selectedDate: Date | null;
}

const HistoryStats: React.FC<HistoryStatsProps> = ({ userId, selectedDate }) => {
  const { stats, loading } = useHistoryStats(userId, selectedDate);

  if (!userId || loading) {
    return <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">Total Focus Time</h3>
        </div>
        <p className="mt-2 text-3xl font-semibold text-gray-900">
          {formatDuration(stats.totalFocusTime)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-medium text-gray-900">Work Sessions</h3>
        </div>
        <p className="mt-2 text-3xl font-semibold text-gray-900">
          {stats.workSessions}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3">
          <Coffee className="w-6 h-6 text-orange-600" />
          <h3 className="text-lg font-medium text-gray-900">Break Sessions</h3>
        </div>
        <p className="mt-2 text-3xl font-semibold text-gray-900">
          {stats.breakSessions}
        </p>
      </div>
    </div>
  );
}

export default HistoryStats;