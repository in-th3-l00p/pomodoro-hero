import { useLocalStorageState } from './useLocalStorageState';
import { DEFAULT_WORK_DURATION, TIMER_STORAGE_KEY } from '../constants/timer';
import type { TimerState } from '../types/timer';

const INITIAL_STATE: TimerState = {
  duration: DEFAULT_WORK_DURATION,
  timeLeft: DEFAULT_WORK_DURATION * 60,
  isRunning: false,
  isTimeUp: false,
  sessionType: 'work',
  sessionName: ''
};

export const useTimerState = () => {
  const [state, setState] = useLocalStorageState<TimerState>(TIMER_STORAGE_KEY, INITIAL_STATE);

  return {
    state,
    updateState: setState
  };
};