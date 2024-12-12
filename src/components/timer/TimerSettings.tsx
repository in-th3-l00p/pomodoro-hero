import React from 'react';

interface TimerSettingsProps {
  duration: number;
  onDurationChange: (duration: number) => void;
  disabled?: boolean;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({ duration, onDurationChange, disabled }) => {
  const presetTimes = [
    { label: '25min', value: 25 },
    { label: '45min', value: 45 },
    { label: '60min', value: 60 },
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        {presetTimes.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onDurationChange(value)}
            disabled={disabled}
            className={`px-4 py-2 rounded-md transition-colors ${
              duration === value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={disabled ? "Can't change duration while timer is active" : undefined}
          >
            {label}
          </button>
        ))}
      </div>
      <input
        type="range"
        min="1"
        max="60"
        value={duration}
        onChange={(e) => onDurationChange(Number(e.target.value))}
        disabled={disabled}
        className={`w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      />
      <span className="text-sm text-gray-500">
        Custom duration: {duration} minutes
      </span>
    </div>
  );
};

export default TimerSettings;