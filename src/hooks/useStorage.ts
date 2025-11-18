import { useState, useEffect, useCallback } from 'react';
import { ChatSession, User } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

export const useStorage = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [storedSessions, storedUser] = await Promise.all([
        storage.get<ChatSession[]>(STORAGE_KEYS.SESSIONS),
        storage.get<User>(STORAGE_KEYS.USER),
      ]);

      if (storedSessions) {
        // Convert date strings back to Date objects
        const parsedSessions = storedSessions.map(session => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
          messages: session.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
        setSessions(parsedSessions);
      }

      if (storedUser) {
        setUser(storedUser);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const saveSession = useCallback(async (session: ChatSession) => {
    const updatedSessions = [
      session,
      ...sessions.filter(s => s.id !== session.id),
    ];
    setSessions(updatedSessions);
    await storage.set(STORAGE_KEYS.SESSIONS, updatedSessions);
  }, [sessions]);

  const deleteSession = useCallback(async (sessionId: string) => {
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
    await storage.set(STORAGE_KEYS.SESSIONS, updatedSessions);
  }, [sessions]);

  const clearAllSessions = useCallback(async () => {
    setSessions([]);
    await storage.remove(STORAGE_KEYS.SESSIONS);
  }, []);

  const saveUser = useCallback(async (userData: User) => {
    setUser(userData);
    await storage.set(STORAGE_KEYS.USER, userData);
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await storage.remove(STORAGE_KEYS.USER);
  }, []);

  return {
    sessions,
    user,
    loading,
    saveSession,
    deleteSession,
    clearAllSessions,
    saveUser,
    logout,
  };
};

