import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarDay from './CalendarDay';
import { getDaysInMonth, startOfMonth, format, addMonths, subMonths } from '../../utils/dateUtils';
import { useCalendarData } from '../../hooks/useCalendarData';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarGridProps {
  onDayClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ onDayClick }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const { dailyStats, loading } = useCalendarData(currentDate);

  const firstDayOfMonth = startOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const startingDayIndex = firstDayOfMonth.getDay();

  const handlePrevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));

  const monthName = format(currentDate, 'MM');
  const year = currentDate.getFullYear();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            {monthName} {year}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-2 md:p-4">
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {/* Weekday Headers */}
          {WEEKDAYS.map(day => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              <span className="hidden md:inline">{day}</span>
              <span className="md:hidden">{day.charAt(0)}</span>
            </div>
          ))}
          
          {/* Empty cells for days before the start of the month */}
          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Calendar Days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
            const stats = dailyStats[format(date, 'yyyy-MM-dd')] || { totalHours: 0, sessions: 0 };
            
            return (
              <CalendarDay
                key={index}
                date={date}
                stats={stats}
                onClick={() => onDayClick(date)}
                isLoading={loading}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;