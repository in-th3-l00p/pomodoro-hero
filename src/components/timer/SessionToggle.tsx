import React from 'react';
import { Timer, Coffee } from 'lucide-react';
import type { SessionType } from '../../types/timer';

interface SessionToggleProps {
  sessionType: SessionType;
  onToggle: (type: SessionType) => void;
  disabled: boolean;
}

const SessionToggle: React.FC<SessionToggleProps> = ({ sessionType, onToggle, disabled }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onToggle('work')}
        disabled={disabled}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          sessionType === 'work'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={disabled ? "Can't change session type while timer is active" : undefined}
      >
        <Timer size={20} />
        <span>Work</span>
      </button>
      <button
        onClick={() => onToggle('break')}
        disabled={disabled}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          sessionType === 'break'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={disabled ? "Can't change session type while timer is active" : undefined}
      >
        <Coffee size={20} />
        <span>Break</span>
      </button>
    </div>
  );
};

export default SessionToggle;