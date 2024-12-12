import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sessionService } from '../services/sessionService';
import { format, startOfMonth, endOfMonth } from '../utils/dateUtils';
import type { DailyStats } from '../types/calendar';

export const useCalendarData = (currentDate: Date) => {
  const { currentUser } = useAuth();
  const [dailyStats, setDailyStats] = useState<Record<string, DailyStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        
        const sessions = await sessionService.getUserSessionsByDateRange(
          currentUser.uid,
          start,
          end
        );

        const stats: Record<string, DailyStats> = {};
        
        sessions.forEach(session => {
          const date = format(session.startedAt, 'yyyy-MM-dd');
          if (!stats[date]) {
            stats[date] = { totalHours: 0, sessions: 0 };
          }
          stats[date].totalHours += session.durationSeconds / 3600;
          stats[date].sessions += 1;
        });

        setDailyStats(stats);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthData();
  }, [currentUser, currentDate]);

  return { dailyStats, loading };
};