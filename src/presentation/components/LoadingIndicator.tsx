import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing } from '../../shared/constants/colors';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'large';
  style?: ViewStyle;
  testID?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Cargando...',
  size = 'large',
  style,
  testID = 'loading-indicator',
}) => {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <ActivityIndicator
        size={size}
        color={Colors.primary}
        testID={`${testID}-spinner`}
      />
      {message && (
        <Text style={styles.message} testID={`${testID}-message`}>
          {message}
        </Text>
      )}
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
  message: {
    marginTop: Spacing.md,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default LoadingIndicator;