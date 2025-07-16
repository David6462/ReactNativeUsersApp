import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../shared/constants/colors';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
  style,
  testID = 'header',
}) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={[styles.container, style]} testID={testID}>
        <View style={styles.leftContainer}>
          {showBackButton && onBackPress && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackPress}
              testID={`${testID}-back`}
            >
              <View style={styles.backArrow} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.centerContainer}>
          <Text style={styles.title} numberOfLines={1} testID={`${testID}-title`}>
            {title}
          </Text>
        </View>
        
        <View style={styles.rightContainer}>
          {rightComponent}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 56,
    paddingHorizontal: Spacing.md,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: Spacing.sm,
  },
  backArrow: {
    width: 12,
    height: 12,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.surface,
    transform: [{ rotate: '45deg' }],
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.surface,
  },
});

export default Header;