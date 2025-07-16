import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {
  SearchInput,
  UserCard,
  LoadingIndicator,
  ErrorMessage,
  EmptyState,
  Header,
} from '../components';
import { UserListItem } from '../../domain/entities/User';
import { Colors, Spacing } from '../../shared/constants/colors';
import { useUsers } from '../hooks/useUsers';
import { useDebounce } from '../hooks/useDebounce';
import { UserListScreenProps } from '../../shared/types/navigation';

const UserListScreen: React.FC<UserListScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  const {
    users,
    loading,
    error,
    refreshing,
    fetchUsers,
    searchUsers,
    refreshUsers,
  } = useUsers();

  // Effect para búsqueda con debounce
  React.useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      searchUsers(debouncedSearchQuery);
    } else {
      fetchUsers();
    }
  }, [debouncedSearchQuery]);

  const handleUserPress = useCallback((user: UserListItem) => {
    navigation.navigate('UserDetail', {
      userId: user.id,
      userName: user.name,
    });
  }, [navigation]);

  const handleRetry = useCallback(() => {
    if (searchQuery.trim()) {
      searchUsers(searchQuery);
    } else {
      fetchUsers();
    }
  }, [searchQuery, searchUsers, fetchUsers]);

  const renderUserItem = useCallback(({ item }: { item: UserListItem }) => (
    <UserCard
      user={item}
      onPress={handleUserPress}
      testID={`user-card-${item.id}`}
    />
  ), [handleUserPress]);

  const renderEmpty = () => {
    if (loading) return null;
    
    if (searchQuery.trim()) {
      return (
        <EmptyState
          title="Sin resultados"
          message={`No se encontraron usuarios que coincidan con "${searchQuery}"`}
          emoji="🔍"
        />
      );
    }
    
    return (
      <EmptyState
        title="No hay usuarios"
        message="No se encontraron usuarios en la base de datos"
        emoji="👥"
      />
    );
  };

  const renderContent = () => {
    if (loading && !refreshing && users.length === 0) {
      return <LoadingIndicator message="Cargando usuarios..." />;
    }

    if (error && users.length === 0) {
      return (
        <ErrorMessage
          message={error}
          onRetry={handleRetry}
          testID="user-list-error"
        />
      );
    }

    return (
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshUsers}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={renderEmpty}
        testID="user-list"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} testID="user-list-screen">
      <Header title="Usuarios" testID="user-list-header" />
      
      <SearchInput
        placeholder="Buscar por nombre..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        testID="user-search-input"
      />
      
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: Spacing.lg,
  },
});

export default UserListScreen;