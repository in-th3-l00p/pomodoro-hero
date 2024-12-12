import { useState, useEffect, useRef, useCallback } from 'react';
import { collection, query, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SESSIONS_COLLECTION } from '../constants/timer';
import type { SessionRecord } from '../types/timer';

const SESSIONS_PER_PAGE = 10;

export const useInfiniteScroll = (userId?: string, selectedDate: Date | null = null) => {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastDocRef = useRef<any>(null);

  const buildQuery = (startAfterDoc?: any) => {
    let baseQuery = query(
      collection(db, SESSIONS_COLLECTION),
      where('userId', '==', userId),
      orderBy('startedAt', 'desc'),
      limit(SESSIONS_PER_PAGE)
    );

    if (startAfterDoc) {
      baseQuery = query(baseQuery, startAfter(startAfterDoc));
    }

    return baseQuery;
  };

  const loadSessions = useCallback(async (isInitial = false) => {
    if (!userId || loading || (!hasMore && !isInitial)) return;

    try {
      setLoading(true);
      const q = buildQuery(isInitial ? null : lastDocRef.current);
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setHasMore(false);
        return;
      }

      const newSessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startedAt: new Date(doc.data().startedAt),
        completedAt: new Date(doc.data().completedAt)
      })) as SessionRecord[];

      lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];
      
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

      setSessions(prev => isInitial ? filteredSessions : [...prev, ...filteredSessions]);
      setHasMore(snapshot.docs.length === SESSIONS_PER_PAGE);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, loading, hasMore, selectedDate]);

  useEffect(() => {
    setSessions([]);
    setHasMore(true);
    lastDocRef.current = null;
    loadSessions(true);
  }, [userId, selectedDate, loadSessions]);

  const loadMoreRef = useCallback((node: any) => {
    if (loading) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadSessions();
      }
    });

    if (node) observer.observe(node);
  }, [loading, hasMore, loadSessions]);

  return {
    sessions,
    loading,
    hasMore,
    loadMoreRef
  };
};