import { useCallback } from 'react';
import { sessionService } from '../services/sessionService';
import type { TimerState } from '../types/timer';

export type SessionStatus = 'completed' | 'paused' | 'cancelled';

export const useSessionTracking = (userId: string | undefined) => {
  const trackSession = useCallback((state: TimerState) => {
    // Optional: Track session start in analytics or state management
    console.log('Session started:', state);
  }, []);

  const completeSession = useCallback(async (
    state: TimerState,
    startTime: Date,
    endTime: Date,
    status: SessionStatus
  ) => {
    if (!userId) return;

    try {
      const elapsedSeconds = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
      
      await sessionService.saveSession({
        userId,
        sessionType: state.sessionType,
        sessionName: state.sessionName,
        durationSeconds: elapsedSeconds,
        startedAt: startTime,
        completedAt: endTime,
        status
      });

      if (status === 'completed') {
        const message = state.sessionType === 'work' 
          ? "Work session completed! Time for a break!"
          : "Break time is over! Ready to work?";
        alert(message);
      }
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }, [userId]);

  return {
    trackSession,
    completeSession
  };
};