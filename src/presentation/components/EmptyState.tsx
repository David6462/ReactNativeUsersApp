import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing } from '../../shared/constants/colors';

interface EmptyStateProps {
  title?: string;
  message?: string;
  emoji?: string;
  style?: ViewStyle;
  testID?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No hay resultados',
  message = 'No se encontraron usuarios que coincidan con tu búsqueda.',
  emoji = '🔍',
  style,
  testID = 'empty-state',
}) => {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title} testID={`${testID}-title`}>
        {title}
      </Text>
      <Text style={styles.message} testID={`${testID}-message`}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  message: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default EmptyState;