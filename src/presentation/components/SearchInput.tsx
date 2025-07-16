import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../shared/constants/colors';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (text: string) => void;
  style?: ViewStyle;
  testID?: string;
  debounceMs?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Buscar usuarios...',
  value,
  onChangeText,
  onSearch,
  style,
  testID = 'search-input',
  debounceMs = 300,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (internalValue !== value) {
        onChangeText(internalValue);
        onSearch?.(internalValue);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [internalValue, debounceMs, onChangeText, onSearch, value]);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleClear = () => {
    setInternalValue('');
    onChangeText('');
    onSearch?.('');
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={internalValue}
          onChangeText={setInternalValue}
          placeholderTextColor={Colors.textSecondary}
          testID={`${testID}-field`}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {internalValue.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            testID={`${testID}-clear`}
          >
            <View style={styles.clearIcon}>
              <View style={styles.clearLine1} />
              <View style={styles.clearLine2} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: Colors.text,
  },
  clearButton: {
    padding: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  clearIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearLine1: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: Colors.textSecondary,
    transform: [{ rotate: '45deg' }],
  },
  clearLine2: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: Colors.textSecondary,
    transform: [{ rotate: '-45deg' }],
  },
});

export default SearchInput;