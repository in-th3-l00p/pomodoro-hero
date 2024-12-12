import { useCallback } from 'react';
import { toast } from 'sonner';
import { Timer, Coffee } from 'lucide-react';
import type { SessionType } from '../types/timer';

export const useTimerNotifications = () => {
  const notifySessionComplete = useCallback((sessionType: SessionType) => {
    const isWork = sessionType === 'work';
    const Icon = isWork ? Coffee : Timer;
    
    toast(
      isWork ? 'Work session completed!' : 'Break time is over!',
      {
        icon: <Icon className={`${isWork ? 'text-indigo-600' : 'text-green-600'}`} />,
        description: isWork ? 'Time for a break!' : 'Ready to work?',
      }
    );
  }, []);

  const notifySessionStart = useCallback((sessionType: SessionType) => {
    toast(
      `${sessionType === 'work' ? 'Work' : 'Break'} session started`,
      {
        icon: sessionType === 'work' ? 
          <Timer className="text-indigo-600" /> : 
          <Coffee className="text-green-600" />
      }
    );
  }, []);

  return {
    notifySessionComplete,
    notifySessionStart
  };
};