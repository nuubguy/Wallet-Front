import React from 'react';
import { shallow } from 'enzyme';
import TransactionContainer from './TransactionContainer';
import mockLocalStorage from '../___mock___/localStorage';
import AccountService from '../Api/AccountService';

beforeEach(() => {
  mockLocalStorage();
});

jest.mock('../Api/AccountService');


describe('TransactionContainer', () => {
  function renderTransactionContainer() {
    return shallow(<TransactionContainer transaction={{}} />);
  }

  describe('render', () => {
    it('should has two route', () => {
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
      const render = renderTransactionContainer();
      expect(render.find('Route').length).toEqual(2);
    });

    it('should contains withdraw route', () => {
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
      const render = renderTransactionContainer();
      const withdraw = render.find('Route').at(0);
      expect(withdraw.props().path).toBe('/transaction/withdraw');
    });

    it('should contains top-up route', () => {
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
      const render = renderTransactionContainer();
      const withdraw = render.find('Route').at(1);
      expect(withdraw.props().path).toBe('/transaction/top-up');
    });
  });

  describe('input of amount of money changes', () => {
    it('should update state', () => {
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
      const render = renderTransactionContainer();
      render.instance().onAmountChange('100');

      expect(render.state().transaction.amount).toEqual('100');
    });
  });

  describe('input of description changes', () => {
    it('should update state', () => {
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
      const render = renderTransactionContainer();
      render.instance().onDescriptionChange('Movie');

      expect(render.state().transaction.description).toEqual('Movie');
    });
  });
});
