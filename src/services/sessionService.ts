import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SESSIONS_COLLECTION } from '../constants/timer';
import type { SessionRecord } from '../types/timer';

export const sessionService = {
  async saveSession(session: Omit<SessionRecord, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, SESSIONS_COLLECTION), {
        ...session,
        completedAt: session.completedAt.toISOString(),
        startedAt: session.startedAt.toISOString(),
        durationSeconds: Math.round(session.durationSeconds)
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving session:', error);
      throw error;
    }
  },

  async getUserSessions(userId: string): Promise<SessionRecord[]> {
    try {
      const q = query(
        collection(db, SESSIONS_COLLECTION),
        where('userId', '==', userId),
        orderBy('completedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        completedAt: new Date(doc.data().completedAt),
        startedAt: new Date(doc.data().startedAt),
        durationSeconds: Math.round(doc.data().durationSeconds)
      })) as SessionRecord[];
    } catch (error) {
      console.error('Error fetching user sessions:', error);
      throw error;
    }
  },

  async getUserSessionsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<SessionRecord[]> {
    try {
      const q = query(
        collection(db, SESSIONS_COLLECTION),
        where('userId', '==', userId),
        where('startedAt', '>=', startDate.toISOString()),
        where('startedAt', '<=', endDate.toISOString()),
        orderBy('startedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        completedAt: new Date(doc.data().completedAt),
        startedAt: new Date(doc.data().startedAt),
        durationSeconds: Math.round(doc.data().durationSeconds)
      })) as SessionRecord[];
    } catch (error) {
      console.error('Error fetching user sessions by date range:', error);
      throw error;
    }
  }
};