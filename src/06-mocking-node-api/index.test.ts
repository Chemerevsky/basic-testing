// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeOutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(() => 123, 1000);

    expect(setTimeOutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeOutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    doStuffByTimeout(mockCallback, 1000);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers({timerLimit: 10});
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(jest.fn(), 100);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    doStuffByInterval(mockCallback, 100);

    jest.advanceTimersByTime(350);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    jest.clearAllTimers();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathJoinSpy = jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync');
    jest.spyOn(fs.promises, 'readFile');

    await readFileAsynchronously('any/path');

    expect(pathJoinSpy).toHaveBeenCalledWith(expect.any(String), 'any/path');
  });

  test('should return null if file does not exist', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    jest.spyOn(path, 'join');
    jest.spyOn(fs.promises, 'readFile');

    existsSyncSpy.mockReturnValue(false);

    await expect(readFileAsynchronously('any/path')).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    jest.spyOn(path, 'join');
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue('file content');
    existsSyncSpy.mockReturnValue(true);

    await expect(readFileAsynchronously('any/path')).resolves.toBe('file content');
  });
});
