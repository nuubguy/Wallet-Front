import { shallow } from 'enzyme/build';
import React from 'react';
import DetailTransactionContainer from './DetailTransactionContainer';
import AccountService from '../Api/AccountService';

jest.mock('../Api/AccountService');

describe('Transaction Container', () => {
  describe('render', () => {
    it('should have two component in render', () => {
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
        getAllTransactionList: mockGetAllTransactionList,
      }));


      const renderedComponent = shallow(<DetailTransactionContainer />);

      expect(renderedComponent.find('section').find('DetailTransactionInput').length).toBe(1);
      expect(renderedComponent.find('section').find('TransactionList').length).toBe(1);
    });
  });

  describe('amountOnChange', () => {
    it('should change the amount when the input change', () => {
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
        getAllTransactionList: mockGetAllTransactionList,
      }));

      const renderedComponent = shallow(<DetailTransactionContainer />);
      const firstAmount = 4000;
      renderedComponent.instance().amountOnChange(firstAmount);

      expect(renderedComponent.state().amount).toBe(4000);
    });
  });


  describe('descriptionOnChange', () => {
    it('should change the description when the input change', () => {
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
        getAllTransactionList: mockGetAllTransactionList,
      }));
      const renderedComponent = shallow(<DetailTransactionContainer />);
      const decription = 'aiueo';
      renderedComponent.instance().descriptionOnChange(decription);

      expect(renderedComponent.state().description).toBe('aiueo');
    });

    it('should call getTransactionListBasedOnDescription with empty description and default sort param', async () => {
      const respTransactionsBasedOnDescriptions = [
        {
          transactionId: 'T00000007',
          type: 'debit',
          dateTime: '2018-09-15T16:22:04.601',
          amount: 500000,
          currency: 'IDR',
        },
      ];

      const respTransactions = [
        {
          transactionId: 'T00000007',
          type: 'debit',
          dateTime: '2018-09-15T16:22:04.601',
          amount: 500000,
          currency: 'IDR',
        },
      ];

      const mockGetTransactionListBasedOnDescription = jest.fn(() => Promise.resolve({
        status: 200,
        data: respTransactionsBasedOnDescriptions,
      }));
      const mockGetAllTransactionList = jest.fn(() => Promise.resolve({
        status: 200,
        data: respTransactions,
      }));


      AccountService.mockClear();
      AccountService.mockImplementation(() => ({
        getAllTransactionList: mockGetAllTransactionList,
        getTransactionListBasedOnDescription: mockGetTransactionListBasedOnDescription,
      }));


      const renderedContainer = shallow(<DetailTransactionContainer />);
      renderedContainer.setState({ transactions: [] });

      renderedContainer.instance().descriptionOnChange('a');
      renderedContainer.instance().amountOnChange('');

      renderedContainer.instance().formSubmit({
        preventDefault: () => {
        },
      });

      expect(mockGetTransactionListBasedOnDescription).toHaveBeenCalledWith('a', 0);
    });

    it('should call getAllTransactionList with default sort param', async () => {
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
        getAllTransactionList: mockGetAllTransactionList,
      }));


      const renderedContainer = shallow(<DetailTransactionContainer />);
      renderedContainer.setState({ transactions: [] });

      renderedContainer.instance().formSubmit({
        preventDefault: () => {
        },
      });

      expect(mockGetAllTransactionList).toHaveBeenCalledWith(0);
    });

    it('should call getTransactionListBasedOnAmount with default sort param', async () => {
      const respTransactionsFilter = [
        {
          transactionId: 'T00000007',
          type: 'debit',
          dateTime: '2018-09-15T16:22:04.601',
          amount: 500000,
          currency: 'IDR',
        },
      ];

      const mockGetTransactionListBasedOnAmount = jest.fn(() => Promise.resolve({
        status: 200,
        data: respTransactionsFilter,
      }));

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
        getAllTransactionList: mockGetAllTransactionList,
        getTransactionListBasedOnAmount: mockGetTransactionListBasedOnAmount,
      }));


      const renderedContainer = shallow(<DetailTransactionContainer />);
      renderedContainer.setState({ transactions: [] });

      renderedContainer.instance().amountOnChange(10000);

      renderedContainer.instance().formSubmit({
        preventDefault: () => {
        },
      });

      expect(mockGetAllTransactionList).toHaveBeenCalledWith(0);
      expect(mockGetTransactionListBasedOnAmount).toHaveBeenCalled();
    });

    it('should call getTransactionListBasedOnAmountAndDescription with default sort param', async () => {
      const respTransactionsFilter = [
        {
          transactionId: 'T00000007',
          type: 'debit',
          dateTime: '2018-09-15T16:22:04.601',
          amount: 500000,
          currency: 'IDR',
        },
      ];

      const mockGetTransactionListBasedOnAmountAndDescription = jest.fn(() => Promise.resolve({
        status: 200,
        data: respTransactionsFilter,
      }));

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
        getAllTransactionList: mockGetAllTransactionList,
        getTransactionListBasedOnAmountAndDescription: mockGetTransactionListBasedOnAmountAndDescription,
      }));


      const renderedContainer = shallow(<DetailTransactionContainer />);
      renderedContainer.setState({ transactions: [] });

      renderedContainer.instance().descriptionOnChange('a');
      renderedContainer.instance().amountOnChange(10000);

      renderedContainer.instance().formSubmit({
        preventDefault: () => {
        },
      });

      expect(mockGetAllTransactionList).toHaveBeenCalledWith(0);
      expect(mockGetTransactionListBasedOnAmountAndDescription).toHaveBeenCalled();
    });

    it('should able to open and close modal dialog', () => {
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
        getAllTransactionList: mockGetAllTransactionList,
      }));
      const renderedComponent = shallow(<DetailTransactionContainer />);

      renderedComponent.instance().onOpenModal();

      expect(renderedComponent.state().open).toBeTruthy();

      renderedComponent.instance().onCloseModal();

      expect(renderedComponent.state().open).toBeFalsy();
    });

    it('should able to click sort images', () => {
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
        getAllTransactionList: mockGetAllTransactionList,
      }));
      const renderedComponent = shallow(<DetailTransactionContainer />);

      renderedComponent.instance().imageOnClick();

      expect(renderedComponent.state().sort).toBe(1);
    });
  });
});
