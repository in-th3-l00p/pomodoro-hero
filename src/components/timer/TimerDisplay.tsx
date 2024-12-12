import React from 'react';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isTimeUp: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ minutes, seconds, isRunning, isTimeUp }) => {
  return (
    <div className={`text-8xl font-bold font-mono ${isTimeUp ? 'text-red-600' : 'text-gray-900'}`}>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};

export default TimerDisplay;