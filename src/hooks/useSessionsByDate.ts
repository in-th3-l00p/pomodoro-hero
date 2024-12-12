import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sessionService } from '../services/sessionService';
import { startOfDay, endOfDay } from '../utils/dateUtils';
import type { SessionRecord } from '../types/timer';

export const useSessionsByDate = (date: Date) => {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        const dailySessions = await sessionService.getUserSessionsByDateRange(
          currentUser.uid,
          startOfDay(date),
          endOfDay(date)
        );
        setSessions(dailySessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [currentUser, date]);

  return { sessions, loading };
};