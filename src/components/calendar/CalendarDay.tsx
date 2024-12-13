import React from 'react';
import { format } from '../../utils/dateUtils';
import type { DailyStats } from '../../types/calendar';
import { Timer } from 'lucide-react';

interface CalendarDayProps {
  date: Date;
  stats: DailyStats;
  onClick: () => void;
  isLoading?: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, stats, onClick, isLoading }) => {
  const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  const hasActivity = stats.totalHours > 0;

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square p-1 md:p-2 rounded-lg border transition-all
        ${isToday ? 'border-indigo-500 bg-indigo-50' : 'border-transparent'}
        ${hasActivity ? 'hover:border-indigo-300' : 'hover:border-gray-300'}
        ${hasActivity ? 'hover:scale-105' : ''}
        relative group
      `}
    >
      <div className="flex flex-col h-full">
        <span className={`
          text-sm md:text-base font-medium
          ${isToday ? 'text-indigo-600' : 'text-gray-700'}
        `}>
          {date.getDate()}
        </span>
        
        {isLoading ? (
          <div className="w-full h-1 bg-gray-200 animate-pulse rounded mt-1" />
        ) : hasActivity ? (
          <div className="flex-1 sm:flex flex-col justify-end hidden">          
            <div className="flex items-center justify-center space-x-1 text-xs md:text-sm text-gray-600">
              <Timer className="w-3 h-3 md:w-4 md:h-4" />
              <span>{stats.totalHours.toFixed(1)}h</span>
            </div>
            <div className="text-xs text-gray-500 hidden md:block">
              {stats.sessions} session{stats.sessions !== 1 ? 's' : ''}
            </div>
          </div>
        ) : null}
      </div>

      {/* Activity Indicator */}
      {hasActivity && (
        <div
          className="absolute inset-0 bg-indigo-50 rounded-lg -z-10 transition-opacity group-hover:opacity-75"
          style={{
            opacity: Math.min(stats.totalHours / 8, 0.5)
          }}
        />
      )}
    </button>
  );
}

export default CalendarDay;