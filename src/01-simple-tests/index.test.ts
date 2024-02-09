// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a: 2, b: 8, action: Action.Add})).toBe(10);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 10, b: 34, action: Action.Subtract})).toBe(-24);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: 3, b: 8, action: Action.Multiply})).toBe(24);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 77, b: 11, action: Action.Divide})).toBe(7);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 5, b: 4, action: Action.Exponentiate})).toBe(625);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 3, b: 4, action: 'some action'})).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: 'string', b: true, action: Action.Add})).toBe(null);
  });
});
