// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },

    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 10, b: 7, action: Action.Subtract, expected: 3 },
    { a: 1, b: 17, action: Action.Subtract, expected: -16 },

    { a: 1, b: 2, action: Action.Multiply, expected: 2 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },

    { a: 7, b: 1, action: Action.Divide, expected: 7 },
    { a: 8, b: 2, action: Action.Divide, expected: 4 },
    { a: 20, b: 5, action: Action.Divide, expected: 4 },

    { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
    { a: 8, b: 2, action: Action.Exponentiate, expected: 64 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

describe.each(testCases)('simpleCalculator', (testCase) => {
  test(`Check action "${testCase.action}" with ${testCase.a} and ${testCase.b} values:`, () => {
    expect(simpleCalculator(testCase)).toBe(testCase.expected);
  });
});