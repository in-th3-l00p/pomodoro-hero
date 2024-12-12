import React, { useState } from 'react';
import BackButton from '../components/common/BackButton';
import CalendarGrid from '../components/calendar/CalendarGrid';
import SessionModal from '../components/calendar/SessionModal';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">Study Calendar</h1>
          <CalendarGrid onDayClick={setSelectedDate} />
        </div>

        {selectedDate && (
          <SessionModal
            date={selectedDate}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;