import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserListItem } from '../../domain/entities/User';
import DIContainer from '../../shared/di/container';

export const useUsers = () => {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const container = DIContainer.getInstance();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await container.getUsersUseCase.execute();
      setUsers(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await container.searchUsersUseCase.execute(query);
      setUsers(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la búsqueda');
    } finally {
      setLoading(false);
    }
  };

  const refreshUsers = async () => {
    try {
      setRefreshing(true);
      setError(null);
      const result = await container.getUsersUseCase.execute();
      setUsers(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refreshing,
    fetchUsers,
    searchUsers,
    refreshUsers,
  };
};