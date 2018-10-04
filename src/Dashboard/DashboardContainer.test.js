import React from 'react';
import { shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';
import AccountService from "../Api/AccountService";

jest.mock('../Api/AccountService');

describe('DashboardContainer', () => {
  function renderDashboardContainer(customer, transaction) {
      const respTransactions = [
          {
              transactionId: 'T00000007',
              type: 'debit',
              dateTime: '2018-09-15T16:22:04.601',
              amount: 500000,
              currency: 'IDR',
          },
      ];

      const resp = {
          accountId: 'A00000001',
          customer: {
              customerId: 'C00000001',
              name: 'Dj',
              info: 'chip',
              disabled: false,
          },
          balance: {
              amount: 5000000,
              currency: 'IDR',
          },
      };

      const mockGetAllTransactionList = jest.fn(() => Promise.resolve({
          status: 200,
          data: respTransactions,
      }));

      const mockGetAccount = jest.fn(() => Promise.resolve({
          status: 200,
          data: resp,
      }));


      mockGetAllTransactionList.mockClear();
      AccountService.mockClear();
      AccountService.mockImplementation(() => ({
          getAccount: mockGetAccount,
          getLastFiveTransactionList: mockGetAllTransactionList,
      }));
    return shallow(<DashboardContainer customer={customer} transaction={transaction} />);
  }

  describe('render', () => {
    it('should has dashboard container component', () => {
      const dashBoardContainer = renderDashboardContainer({}, {});
      expect(dashBoardContainer.find('Dashboard').length).toBe(1);
    });
  });
});
