import React from 'react';
import { shallow } from 'enzyme';
import TransferContainer from './TransferContainer';
import mockLocalStorage from '../___mock___/localStorage';
import AccountService from '../Api/AccountService';

beforeEach(() => {
  mockLocalStorage();
});

jest.mock('../Api/AccountService');

describe('TransactionContainer', () => {
  function renderTransferContainer() {
    const respTransactions = [
      {
        transactionId: 'T00000007',
        type: 'debit',
        dateTime: '2018-09-15T16:22:04.601',
        amount: 500000,
        currency: 'IDR',
      },
    ];


    const mockGetAllTransactionList = jest.fn(() => Promise.resolve({
      status: 200,
      data: respTransactions,
    }));


    mockGetAllTransactionList.mockClear();
    AccountService.mockClear();
    AccountService.mockImplementation(() => ({
      getAccount: mockGetAllTransactionList,
    }));
    return shallow(<TransferContainer transaction={{}} />);
  }

  describe('render', () => {
    it('should contains transaction title', () => {
      const render = renderTransferContainer();

      expect(render.find('.transaction-title').length).toEqual(1);
    });

    it('should contains transfer component', () => {
      const render = renderTransferContainer();
      expect(render.find('Transfer').length).toEqual(1);
    });
  });

  describe('input of amount of money changes', () => {
    it('should update state', () => {
      const render = renderTransferContainer();
      render.instance().onAmountChange('100');

      expect(render.state().transaction.amount).toEqual('100');
    });
  });

  describe('input of description changes', () => {
    it('should update state', () => {
      const render = renderTransferContainer();
      render.instance().onDescriptionChange('Movie');

      expect(render.state().transaction.description).toEqual('Movie');
    });
  });

  describe('payee wallet changes', () => {
    it('should update state', () => {
      const render = renderTransferContainer();
      render.instance().onPayeeWalletChange('A00000002');

      expect(render.state().transaction.payeeWallet).toEqual('A00000002');
    });
  });
});
