import React from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ selectedDate, onChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="date"
          value={selectedDate?.toISOString().split('T')[0] || ''}
          onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {selectedDate && (
        <button
          onClick={() => onChange(null)}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Clear filter
        </button>
      )}
    </div>
  );
}

export default DateFilter;