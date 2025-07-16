export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

export const formatPhone = (phone: string): string => {
  return phone.replace(/[\s\-\(\)]/g, '');
};

// Test del archivo
describe('Validation Utils', () => {
  describe('validateEmail', () => {
    test('debe devolver true para los correos electrónicos válidos', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co')).toBe(true);
    });

    test('debe devolver false para los correos electrónicos no válidos', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    test('debe devolver true para teléfonos válidos', () => {
      expect(validatePhone('+57 301 234 5678')).toBe(true);
      expect(validatePhone('3012345678')).toBe(true);
    });

    test('debe devolver false para teléfonos no válidos', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('abc')).toBe(false);
    });
  });

  describe('getInitials', () => {
    test('debe devolver las iniciales correctas', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Maria Garcia Lopez')).toBe('MG');
      expect(getInitials('John')).toBe('J');
    });

    test('debe tratar los casos extremos', () => {
      expect(getInitials('')).toBe('');
      expect(getInitials(' ')).toBe('');
    });
  });
});