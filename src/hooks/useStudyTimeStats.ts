import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SESSIONS_COLLECTION } from '../constants/timer';
import { startOfDay, subDays, endOfDay } from '../utils/dateUtils';

interface StudyTimeData {
  date: string;
  hours: number;
}

interface HourlyData {
  hour: number;
  hours: number;
}

export const useStudyTimeStats = (userId: string | undefined) => {
  const [weeklyData, setWeeklyData] = useState<StudyTimeData[]>([]);
  const [dailyData, setDailyData] = useState<HourlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudyTimeStats = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const today = new Date();
        const sevenDaysAgo = subDays(today, 7);

        // Query for the last 7 days
        const sessionsQuery = query(
          collection(db, SESSIONS_COLLECTION),
          where('userId', '==', userId),
          where('startedAt', '>=', sevenDaysAgo.toISOString()),
          where('startedAt', '<=', today.toISOString())
        );

        const querySnapshot = await getDocs(sessionsQuery);
        const sessions = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          startedAt: new Date(doc.data().startedAt),
          completedAt: new Date(doc.data().completedAt)
        }));

        // Process weekly data
        const weeklyStats = new Map<string, number>();
        for (let i = 0; i < 7; i++) {
          const date = subDays(today, i);
          weeklyStats.set(date.toISOString().split('T')[0], 0);
        }

        // Process daily data (24-hour distribution)
        const hourlyStats = new Map<number, number>();
        for (let i = 0; i < 24; i++) {
          hourlyStats.set(i, 0);
        }

        sessions.forEach(session => {
          const dateKey = session.startedAt.toISOString().split('T')[0];
          const hours = session.durationSeconds / 3600;
          
          // Add to weekly stats
          if (weeklyStats.has(dateKey)) {
            weeklyStats.set(dateKey, (weeklyStats.get(dateKey) || 0) + hours);
          }

          // Add to hourly stats if session is from today
          if (session.startedAt >= startOfDay(today) && session.startedAt <= endOfDay(today)) {
            const hour = session.startedAt.getHours();
            hourlyStats.set(hour, (hourlyStats.get(hour) || 0) + hours);
          }
        });

        // Convert to array format for charts
        const weeklyDataArray = Array.from(weeklyStats.entries())
          .map(([date, hours]) => ({ date, hours }))
          .reverse();

        const hourlyDataArray = Array.from(hourlyStats.entries())
          .map(([hour, hours]) => ({ hour, hours }));

        setWeeklyData(weeklyDataArray);
        setDailyData(hourlyDataArray);
      } catch (error) {
        console.error('Error fetching study time stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyTimeStats();
  }, [userId]);

  return { weeklyData, dailyData, loading };
};