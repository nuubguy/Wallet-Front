import React from 'react';
import { shallow } from 'enzyme';
import PayeeContainer from './PayeeContainer';
import axios from '../../../../../../../Homebase reactJs/src/__mock__/axios';
import mockLocalStorage from '../___mock___/localStorage';
import AccountService from '../Api/AccountService';

jest.mock('../Api/AccountService');

beforeEach(() => {
  mockLocalStorage();
});

jest.mock('axios');

describe('PayeeContainer', () => {
  function renderPayeeContainer() {
    return shallow(<PayeeContainer />);
  }

  describe('render', () => {
    it('should has a payee', () => {
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
      const render = renderPayeeContainer();
      expect(render.find('Payee').length).toEqual(1);
    });
  });

  describe('input of account id changes', () => {
    it('should update state', () => {
      const render = renderPayeeContainer();
      render.instance().onAccountIdChange('A00000001');

      expect(render.state().payee.accountId).toEqual('A00000001');
    });
  });
});
