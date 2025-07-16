import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {
  LoadingIndicator,
  ErrorMessage,
  Header,
} from '../components';
import { Colors, Spacing, BorderRadius } from '../../shared/constants/colors';
import { useUser } from '../hooks/useUser';
import { UserDetailScreenProps } from '../../shared/types/navigation';

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { userId, userName } = route.params;
  const { user, loading, error, refetch } = useUser(userId);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCall = async (phone: string) => {
    try {
      const phoneUrl = `tel:${phone}`;
      const supported = await Linking.canOpenURL(phoneUrl);
      
      if (supported) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', 'No se puede realizar la llamada');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al intentar llamar');
    }
  };

  const handleEmail = async (email: string) => {
    try {
      const emailUrl = `mailto:${email}`;
      const supported = await Linking.canOpenURL(emailUrl);
      
      if (supported) {
        await Linking.openURL(emailUrl);
      } else {
        Alert.alert('Error', 'No se puede abrir el cliente de email');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al intentar enviar email');
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingIndicator message="Cargando detalles del usuario..." />;
    }

    if (error || !user) {
      return (
        <ErrorMessage
          message={error || 'Usuario no encontrado'}
          onRetry={refetch}
          testID="user-detail-error"
        />
      );
    }

    return (
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar y nombre */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
        </View>

        {/* Información de contacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacto</Text>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => handleEmail(user.email)}
            testID="email-button"
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📧</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.actionArrow} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => handleCall(user.phone)}
            testID="phone-button"
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📞</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
            <View style={styles.actionArrow} />
          </TouchableOpacity>
        </View>

        {/* Información de ubicación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🏙️</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Ciudad</Text>
              <Text style={styles.infoValue}>{user.city}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📍</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Dirección</Text>
              <Text style={styles.infoValue}>{user.address}</Text>
            </View>
          </View>
        </View>

        {/* Información laboral */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trabajo</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🏢</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Empresa</Text>
              <Text style={styles.infoValue}>{user.company}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container} testID="user-detail-screen">
      <Header
        title={userName || 'Detalles'}
        showBackButton
        onBackPress={handleBack}
        testID="user-detail-header"
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.md,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    color: Colors.surface,
    fontSize: 32,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  icon: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  actionArrow: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: Colors.textSecondary,
    transform: [{ rotate: '45deg' }],
  },
});

export default UserDetailScreen;