import React from 'react';
import TimerDisplay from '../components/timer/TimerDisplay';
import TimerControls from '../components/timer/TimerControls';
import TimerSettings from '../components/timer/TimerSettings';
import SessionToggle from '../components/timer/SessionToggle';
import SessionNameInput from '../components/timer/SessionNameInput';
import BackButton from '../components/common/BackButton';
import { useTimer } from '../hooks/useTimer';

const Timer: React.FC = () => {
  const { state, actions } = useTimer();
  const { duration, timeLeft, isRunning, isTimeUp, sessionType, sessionName, hasStarted } = state;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleComplete = () => {
    if (sessionType === 'work') {
      actions.completeAndBreak();
    } else {
      actions.completeAndWork();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center space-y-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {sessionType === 'work' ? 'Work Session' : 'Break Time'}
              </h1>
              
              <SessionToggle
                sessionType={sessionType}
                onToggle={actions.toggleSession}
                disabled={hasStarted}
              />

              {sessionType === 'work' && (
                <SessionNameInput
                  value={sessionName}
                  onChange={actions.setSessionName}
                  disabled={hasStarted}
                />
              )}
              
              <TimerDisplay
                minutes={minutes}
                seconds={seconds}
                isRunning={isRunning}
                isTimeUp={isTimeUp}
              />
              
              <TimerControls
                isRunning={isRunning}
                sessionType={sessionType}
                hasStarted={hasStarted}
                onStart={actions.start}
                onPause={actions.pause}
                onReset={actions.reset}
                onComplete={handleComplete}
              />
              
              <div className="w-full max-w-md pt-8 border-t">
                <TimerSettings
                  duration={duration}
                  onDurationChange={actions.setDuration}
                  disabled={hasStarted}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;