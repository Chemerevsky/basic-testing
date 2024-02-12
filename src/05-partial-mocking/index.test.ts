// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: () => 'foo',
    mockTwo: () => 'bar',
    mockThree: () => 'baz',
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    expect(mockOne()).toEqual(expect.any(String));
    expect(mockTwo()).toEqual(expect.any(String));
    expect(mockThree()).toEqual(expect.any(String));
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
