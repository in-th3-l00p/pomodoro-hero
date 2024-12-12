import React from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  sessionType: 'work' | 'break';
  hasStarted: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onComplete: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  sessionType,
  hasStarted,
  onStart,
  onPause,
  onReset,
  onComplete,
}) => {
  const showStopButton = !isRunning && hasStarted;
  const buttonColor = sessionType === 'work' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-green-600 hover:bg-green-700';

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={isRunning ? onPause : onStart}
        className={`flex items-center justify-center w-12 h-12 rounded-full ${buttonColor} text-white transition-colors`}
        aria-label={isRunning ? "Pause" : "Start"}
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} />}
      </button>

      {showStopButton && (
        <button
          onClick={onComplete}
          className={`flex items-center justify-center w-12 h-12 rounded-full ${buttonColor} text-white transition-colors`}
          aria-label={`Complete ${sessionType} session`}
        >
          <Square size={20} />
        </button>
      )}

      <button
        onClick={onReset}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 transition-colors"
        aria-label="Reset"
      >
        <RotateCcw size={24} />
      </button>
    </div>
  );
};

export default TimerControls;