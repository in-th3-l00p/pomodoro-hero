import { useCallback, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTimerState } from './useTimerState';
import { useSessionTracking } from './useSessionTracking';
import { useTimerNotifications } from './useTimerNotifications';
import { DEFAULT_WORK_DURATION, DEFAULT_BREAK_DURATION } from '../constants/timer';
import type { SessionType } from '../types/timer';

export const useTimer = () => {
  const { currentUser } = useAuth();
  const { state, updateState } = useTimerState();
  const { trackSession, completeSession } = useSessionTracking(currentUser?.uid);
  const { notifySessionComplete, notifySessionStart } = useTimerNotifications();
  const sessionStartTime = useRef<Date | null>(null);
  const hasStarted = useRef<boolean>(false);

  useEffect(() => {
    if (state.isRunning && !sessionStartTime.current) {
      sessionStartTime.current = new Date();
      hasStarted.current = true;
      trackSession(state);
      notifySessionStart(state.sessionType);
    }
  }, [state.isRunning, trackSession, state, notifySessionStart]);

  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      updateState(prev => {
        if (prev.timeLeft <= 1) {
          const nextSessionType = prev.sessionType === 'work' ? 'break' : 'work';
          const nextDuration = nextSessionType === 'work' ? DEFAULT_WORK_DURATION : DEFAULT_BREAK_DURATION;
          
          if (sessionStartTime.current) {
            completeSession(prev, sessionStartTime.current, new Date(), 'completed');
            notifySessionComplete(prev.sessionType);
            sessionStartTime.current = null;
            hasStarted.current = false;
          }
          
          return {
            ...prev,
            isRunning: false,
            isTimeUp: true,
            sessionType: nextSessionType,
            duration: nextDuration,
            timeLeft: nextDuration * 60,
            sessionName: ''
          };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, updateState, completeSession, notifySessionComplete]);

  const start = useCallback(() => {
    updateState(prev => ({ ...prev, isRunning: true, isTimeUp: false }));
  }, [updateState]);

  const pause = useCallback(() => {
    updateState(prev => ({ ...prev, isRunning: false }));
  }, [updateState]);

  const reset = useCallback(() => {
    if (sessionStartTime.current) {
      completeSession(state, sessionStartTime.current, new Date(), 'cancelled');
    }
    sessionStartTime.current = null;
    hasStarted.current = false;
    updateState(prev => ({
      ...prev,
      timeLeft: prev.duration * 60,
      isRunning: false,
      isTimeUp: false
    }));
  }, [state, updateState, completeSession]);

  const setDuration = useCallback((duration: number) => {
    updateState(prev => ({
      ...prev,
      duration,
      timeLeft: duration * 60
    }));
  }, [updateState]);

  const toggleSession = useCallback((type: SessionType) => {
    if (hasStarted.current) return;
    const duration = type === 'work' ? DEFAULT_WORK_DURATION : DEFAULT_BREAK_DURATION;
    updateState(prev => ({
      ...prev,
      sessionType: type,
      duration,
      timeLeft: duration * 60,
      sessionName: ''
    }));
  }, [updateState]);

  const setSessionName = useCallback((name: string) => {
    updateState(prev => ({ ...prev, sessionName: name }));
  }, [updateState]);

  const completeAndBreak = useCallback(() => {
    if (state.sessionType !== 'work' || state.isRunning) return;

    if (sessionStartTime.current) {
      completeSession(state, sessionStartTime.current, new Date(), 'completed');
      notifySessionComplete(state.sessionType);
      sessionStartTime.current = null;
      hasStarted.current = false;
    }

    updateState(prev => ({
      ...prev,
      sessionType: 'break',
      duration: DEFAULT_BREAK_DURATION,
      timeLeft: DEFAULT_BREAK_DURATION * 60,
      isRunning: false,
      isTimeUp: false,
      sessionName: ''
    }));
  }, [state, updateState, completeSession, notifySessionComplete]);

  const completeAndWork = useCallback(() => {
    if (state.sessionType !== 'break' || state.isRunning) return;

    if (sessionStartTime.current) {
      completeSession(state, sessionStartTime.current, new Date(), 'completed');
      notifySessionComplete(state.sessionType);
      sessionStartTime.current = null;
      hasStarted.current = false;
    }

    updateState(prev => ({
      ...prev,
      sessionType: 'work',
      duration: DEFAULT_WORK_DURATION,
      timeLeft: DEFAULT_WORK_DURATION * 60,
      isRunning: false,
      isTimeUp: false,
      sessionName: ''
    }));
  }, [state, updateState, completeSession, notifySessionComplete]);

  return {
    state: {
      ...state,
      hasStarted: hasStarted.current
    },
    actions: {
      start,
      pause,
      reset,
      setDuration,
      toggleSession,
      setSessionName,
      completeAndBreak,
      completeAndWork
    }
  };
};