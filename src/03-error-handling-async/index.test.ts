// Uncomment the code below and write your tests
import { resolveValue, throwError, throwCustomError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('any')).resolves.toBe('any');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => {
      throwError('test error message')
    }).toThrow('test error message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError()
    }).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError()
    }).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow('This is my awesome custom error!');
  });
});
