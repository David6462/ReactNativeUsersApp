import { useState, useEffect } from 'react';
import { User } from '../../domain/entities/User';
import DIContainer from '../../shared/di/container';

export const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const container = DIContainer.getInstance();

  const fetchUser = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const result = await container.getUserByIdUseCase.execute(userId);
      setUser(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar usuario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
};