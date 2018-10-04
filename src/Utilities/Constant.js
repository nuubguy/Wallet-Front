/*
    This class represent static value
 */

export default class Constant {
  static id() {
    return 'C00000001';
  }

  static accountId() {
    return 'A00000001';
  }

  static currency() {
    return 'IDR';
  }

  static debit() {
    return 'TRANSFER';
  }

  static credit() {
    return 'TOP UP';
  }

  static minimumTransaction() {
    return 15000;
  }

  static maximumTransaction() {
    return 50000000;
  }

  static successAddPayee() {
    return 'Add payee successful';
  }

  static errorAddPayee() {
    return 'Oops! Account not found';
  }
}
