import { useState, useEffect } from 'react';
import { sessionService } from '../services/sessionService';

interface HistoryStats {
  totalFocusTime: number;
  workSessions: number;
  breakSessions: number;
}

export const useHistoryStats = (userId?: string, selectedDate: Date | null = null) => {
  const [stats, setStats] = useState<HistoryStats>({
    totalFocusTime: 0,
    workSessions: 0,
    breakSessions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const sessions = await sessionService.getUserSessions(userId);
        
        const filteredSessions = selectedDate
          ? sessions.filter(session => {
              const sessionDate = new Date(session.startedAt);
              return (
                sessionDate.getDate() === selectedDate.getDate() &&
                sessionDate.getMonth() === selectedDate.getMonth() &&
                sessionDate.getFullYear() === selectedDate.getFullYear()
              );
            })
          : sessions;

        const newStats = filteredSessions.reduce(
          (acc, session) => ({
            totalFocusTime: acc.totalFocusTime + session.durationSeconds,
            workSessions: acc.workSessions + (session.sessionType === 'work' ? 1 : 0),
            breakSessions: acc.breakSessions + (session.sessionType === 'break' ? 1 : 0)
          }),
          { totalFocusTime: 0, workSessions: 0, breakSessions: 0 }
        );

        setStats(newStats);
      } catch (error) {
        console.error('Error fetching history stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId, selectedDate]);

  return { stats, loading };
};