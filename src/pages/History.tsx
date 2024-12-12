import React, { useState } from 'react';
import BackButton from '../components/common/BackButton';
import SessionStats from '../components/history/SessionStats';
import SessionList from '../components/history/SessionList';
import { Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const History: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">Session History</h1>
          
          <SessionStats userId={currentUser?.uid} selectedDate={selectedDate} />
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={selectedDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear filter
              </button>
            )}
          </div>
          
          <SessionList userId={currentUser?.uid} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default History;