import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot, Query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SESSIONS_COLLECTION } from '../constants/timer';
import type { SessionRecord } from '../types/timer';

export const useFirestoreQuery = (userId?: string, selectedDate: Date | null = null) => {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    let q: Query = query(
      collection(db, SESSIONS_COLLECTION),
      where('userId', '==', userId),
      orderBy('completedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newSessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        completedAt: new Date(doc.data().completedAt),
        startedAt: new Date(doc.data().startedAt)
      })) as SessionRecord[];

      // Filter by date if selected
      const filteredSessions = selectedDate
        ? newSessions.filter(session => {
            const sessionDate = new Date(session.startedAt);
            return (
              sessionDate.getDate() === selectedDate.getDate() &&
              sessionDate.getMonth() === selectedDate.getMonth() &&
              sessionDate.getFullYear() === selectedDate.getFullYear()
            );
          })
        : newSessions;

      setSessions(filteredSessions);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching sessions:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, selectedDate]);

  return { sessions, loading };
};