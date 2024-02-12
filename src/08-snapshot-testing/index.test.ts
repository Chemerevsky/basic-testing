// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const testValues = [1, 2, 3, 4];
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(testValues)).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(testValues)).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": {
              "next": {
                "next": null,
                "value": null,
              },
              "value": 4,
            },
            "value": 3,
          },
          "value": 2,
        },
        "value": 1,
      }
    `);
  });
});
