// Tests básicos sin imports complejos
describe('Simple Math Tests', () => {
  test('addition works', () => {
    expect(1 + 1).toBe(2);
  });

  test('string concatenation works', () => {
    expect('hello' + ' world').toBe('hello world');
  });
});

// Test de función pura
function validateEmail(email: string): boolean {
  return email.includes('@') && email.includes('.');
}

describe('Email Validation', () => {
  test('should validate correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('should reject invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
  });
});