export type SessionType = 'work' | 'break';
export type SessionStatus = 'completed' | 'paused' | 'cancelled';

export interface TimerState {
  duration: number; // in minutes for UI
  timeLeft: number; // in seconds
  isRunning: boolean;
  isTimeUp: boolean;
  sessionType: SessionType;
  sessionName: string;
}

export interface SessionRecord {
  id?: string;
  userId: string;
  sessionType: SessionType;
  sessionName: string;
  durationSeconds: number; // Changed from duration to durationSeconds
  completedAt: Date;
  startedAt: Date;
  status: SessionStatus;
}