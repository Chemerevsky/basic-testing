// Uncomment the code below and write your tests
import { getBankAccount, BankAccount, InsufficientFundsError, SynchronizationFailedError } from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(100)).toBeInstanceOf(BankAccount);
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const testBankAccount = getBankAccount(100);
    expect(() => testBankAccount.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const fromAccount = getBankAccount(50);
    const toAccount = getBankAccount(0);
    expect(() => fromAccount.transfer(200, toAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const fromAccount = getBankAccount(50);
    expect(() => fromAccount.transfer(20, fromAccount)).toThrow();
  });

  test('should deposit money', () => {
    const testAccount = getBankAccount(50).deposit(20);
    expect(testAccount.getBalance()).toBe(70);
  });

  test('should withdraw money', () => {
    const testAccount = getBankAccount(50).withdraw(20);
    expect(testAccount.getBalance()).toBe(30);
  });

  test('should transfer money', () => {
    const fromAccount = getBankAccount(200);
    const toAccount = getBankAccount(0);
    fromAccount.transfer(150, toAccount);

    expect(fromAccount.getBalance()).toBe(50);
    expect(toAccount.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const testAccount = getBankAccount(20);
    const spyRandom = jest.spyOn(lodash, 'random');
    spyRandom.mockReturnValueOnce(50);
    spyRandom.mockReturnValueOnce(1);
    await expect(testAccount.fetchBalance()).resolves.toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const testAccount = getBankAccount(20);
    const newBalance = 30;
    const spyFetchBalance = jest.spyOn(testAccount, 'fetchBalance');
    spyFetchBalance.mockResolvedValue(newBalance);
    await testAccount.synchronizeBalance();
    expect(testAccount.getBalance()).toEqual(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const testAccount = getBankAccount(20);
    const spyFetchBalance = jest.spyOn(testAccount, 'fetchBalance');
    spyFetchBalance.mockResolvedValue(null);
    await expect(testAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError)
  });
});
