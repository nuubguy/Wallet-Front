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
    return 'debit';
  }

  static credit() {
    return 'credit';
  }

  static minimumTransaction() {
    return 15000;
  }

  static maximumTransaction() {
    return 50000000;
  }
}
