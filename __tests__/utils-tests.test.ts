import {
  validateEmail,
  validatePhone,
  validateRequired,
  getInitials,
  formatPhone,
} from '../src/shared/utils/validation.test';

describe('Utils Layer Tests', () => {
  describe('validateEmail', () => {
    test('debe devolver true para los correos electrónicos válidos', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co')).toBe(true);
      expect(validateEmail('a@b.c')).toBe(true);
    });

    test('debe devolver false para los correos electrónicos no válidos', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test.example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    test('debe devolver true para teléfonos válidos', () => {
      expect(validatePhone('+57 301 234 5678')).toBe(true);
      expect(validatePhone('3012345678')).toBe(true);
      expect(validatePhone('+1-555-123-4567')).toBe(true);
      expect(validatePhone('(301) 234-5678')).toBe(true);
    });

    test('debe devolver false si el teléfono no es válido', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('abc')).toBe(false);
      expect(validatePhone('')).toBe(false);
      expect(validatePhone('12345')).toBe(false);
    });
  });

  describe('validateRequired', () => {
    test('debe devolver verdadero para cadenas no vacías', () => {
      expect(validateRequired('hello')).toBe(true);
      expect(validateRequired('a')).toBe(true);
      expect(validateRequired('  hello  ')).toBe(true);
    });

    test('debe devolver false para cadenas vacías o con espacios en blanco', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
      expect(validateRequired('\t\n')).toBe(false);
    });
  });

  describe('getInitials', () => {
    test('debe devolver las iniciales correctas de los nombres completos', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Maria Garcia Lopez')).toBe('MG');
      expect(getInitials('Ana Isabel Martinez')).toBe('AI');
    });

    test('debe manejar nombres únicos', () => {
      expect(getInitials('John')).toBe('J');
      expect(getInitials('Maria')).toBe('M');
    });

    test('debe tratar los casos extremos', () => {
      expect(getInitials('')).toBe('');
      expect(getInitials(' ')).toBe('');
      expect(getInitials('a b c d e')).toBe('AB'); // Only first 2
    });
  });

  describe('formatPhone', () => {
    test('debe eliminar los caracteres de formato', () => {
      expect(formatPhone('+57 301 234 5678')).toBe('+573012345678');
      expect(formatPhone('(301) 234-5678')).toBe('3012345678');
      expect(formatPhone('+1-555-123-4567')).toBe('+15551234567');
    });

    test('debe manejar teléfonos ya formateados', () => {
      expect(formatPhone('3012345678')).toBe('3012345678');
      expect(formatPhone('+573012345678')).toBe('+573012345678');
    });
  });
});