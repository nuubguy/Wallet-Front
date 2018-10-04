import axios from 'axios';
import AccountService from './AccountService';
import Constant from '../Utilities/Constant';
import Endpoint from './Endpoint';
import mockLocalStorage from '../___mock___/localStorage';

beforeEach(() => {
  mockLocalStorage();
});

jest.mock('axios');

describe('accountService', () => {
  const TestAccount = () => new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());

  function getCustomer() {
    return {
      accountId: '',
      customer: {
        customerId: '',
        name: '',
        info: '',
        disabled: '',
      },
      balance: {
        amount: '',
        currency: '',
      },

    };
  }

  describe('getAccountBalance', async () => {
    it('should get account balance from API', async () => {
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
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: resp,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getAccount();

      expect(result.status).toBe(200);
      expect(result.data.balance.amount).toBe(5000000.0);
      expect(result.data.balance.currency).toBe('IDR');
    });
  });

  describe('getCustomerInfo', async () => {
    it('should fetch info of customer account from API', async () => {
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
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: resp,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getAccount();

      expect(result.status).toBe(200);
      expect(result.data.customer.customerId).toBe('C00000001');
      expect(result.data.customer.name).toBe('Dj');
    });
  });

  describe('getLastFiveTransactionList', () => {
    it('should fetch last 5 transactions of customer account', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      ];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getLastFiveTransactionList();

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].type).toBe('TRANSFER');
      expect(result.data[4].type).toBe('TRANSFER');
    });
  });

  describe('postTransaction', async () => {
    it('should success post transaction to API', async () => {
      const respAccount = {
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

      axios.get.mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respAccount,
      }));


      const transactionResponse = {
        transactionId: 'T00000006',
        debit: null,
        credit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000001', name: 'nofanto', info: 'chip', disabled: false,
          },
          balance: { amount: 1.1E7, currency: 'IDR' },
        },
        dateTime: '2018-09-15T19:02:17.035',
        transactionAmount: { amount: 1000000.0, currency: 'IDR' },
      };
      axios.post.mockImplementationOnce(() => Promise.resolve({
        status: 201,
        data: transactionResponse,
      }));

      const testAccount = TestAccount();
      await testAccount.getAccount();
      const result = await testAccount.postTransaction({ type: 'credit', amount: 1000000 }, getCustomer());

      expect(result.data.transactionId).toBe('T00000006');
      expect(result.status).toBe(201);
    });
  });

  describe('getCustomerInfo', async () => {
    it('should fetch info of customer account from API', async () => {
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

      axios.get.mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: resp,
      }));


      const transactionResponse = {
        timestamp: '2018-09-22T20:03:33.670+0000',
        status: 403,
        error: 'Forbidden',
        message: 'Insufficient balance',
        path: '/transactions',
      };
      axios.post.mockImplementationOnce(() => Promise.reject({
        response: {
          status: 403,
          data: transactionResponse,
        },
      }));


      const testAccount = TestAccount();
      await testAccount.getAccount();
      let result;
      try {
        result = await testAccount.postTransaction({ type: 'credit', amount: 1000000 }, getCustomer());
      } catch (e) {
        result = e;
      }


      expect(result.status).toBe(403);
      expect(result.data).toBe('Insufficient balance');
    });
  });

  describe('postTransfer', async () => {
    it('should success post transfer to API', async () => {
      const respAccount = {
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

      axios.get.mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respAccount,
      }));


      const transactionResponse = {
        transactionId: 'T00000006',
        debit: {
          accountId: 'A00000003',
          customer: {
            customerId: 'C00000002', name: 'nofanto', info: 'chip', disabled: false,
          },
          balance: { amount: 1.1E7, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000001', name: 'nofanto', info: 'chip', disabled: false,
          },
          balance: { amount: 1.1E7, currency: 'IDR' },
        },
        dateTime: '2018-09-15T19:02:17.035',
        transactionAmount: { amount: 1000000.0, currency: 'IDR' },
      };
      axios.post.mockImplementationOnce(() => Promise.resolve({
        status: 201,
        data: transactionResponse,
      }));

      const testAccount = TestAccount();
      await testAccount.getAccount();
      const result = await testAccount.postTransaction({ type: 'credit', amount: 1000000 }, getCustomer());

      expect(result.data.transactionId).toBe('T00000006');
      expect(result.status).toBe(201);
    });

    it('should failed post transfer to API', async () => {
      const respAccount = {
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

      axios.get.mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respAccount,
      }));


      const transactionResponse = {
        timestamp: '2018-09-22T20:03:33.670+0000',
        status: 403,
        error: 'Forbidden',
        message: 'Insufficient balance',
        path: '/transactions',
      };
      axios.post.mockImplementationOnce(() => Promise.reject({
        response: {
          status: 403,
          data: transactionResponse,
        },
      }));


      const testAccount = TestAccount();
      await testAccount.getAccount();
      let result;
      try {
        result = await testAccount.postTransaction({ type: 'credit', amount: 1000000 }, getCustomer());
      } catch (e) {
        result = e;
      }


      expect(result.status).toBe(403);
      expect(result.data).toBe('Insufficient balance');
    });
  });

  describe('getAllTransactionList', () => {
    it('should fetch with default sort by date', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      ];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getAllTransactionList(0);

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].type).toBe('TRANSFER');
      expect(result.data[4].type).toBe('TRANSFER');
    });

    it('should fetch with sort by amount', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      ];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getAllTransactionList(1);

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].type).toBe('TRANSFER');
      expect(result.data[4].type).toBe('TRANSFER');
    });
  });

  describe('getTransactionListBasedOnDescription', () => {
    it('should fetch with description and default sort by date', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      ];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getTransactionListBasedOnDescription('beli mobil', 0);

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].type).toBe('TRANSFER');
      expect(result.data[4].type).toBe('TRANSFER');
    });
  });

  describe('getTransactionListBasedOnAmount', () => {
    it('should fetch with filter by amount', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      ];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getTransactionListBasedOnAmount(500000, 0);

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].type).toBe('TRANSFER');
      expect(result.data[4].type).toBe('TRANSFER');
    });
  });

  describe('getTransactionListBasedOnAmountAndDescription', () => {
    it('should fetch with filter by amount and description', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      ];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getTransactionListBasedOnAmountAndDescription(500000, 'beli mobil');

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].type).toBe('TRANSFER');
      expect(result.data[4].type).toBe('TRANSFER');
    });
  });

  describe('getTransactionList', () => {
    it('should fetch last 5 transactions of customer account', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      {
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      },
      ];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getLastFiveTransactionList();

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].type).toBe('TRANSFER');
      expect(result.data[4].type).toBe('TRANSFER');
    });
  });

  describe('postTransaction', async () => {
    it('should success post transaction to API', async () => {
      const respAccount = {
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

      axios.get.mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respAccount,
      }));


      const transactionResponse = {
        transactionId: 'T00000006',
        debit: null,
        credit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000001', name: 'nofanto', info: 'chip', disabled: false,
          },
          balance: { amount: 1.1E7, currency: 'IDR' },
        },
        dateTime: '2018-09-15T19:02:17.035',
        transactionAmount: { amount: 1000000.0, currency: 'IDR' },
      };
      axios.post.mockImplementationOnce(() => Promise.resolve({
        status: 201,
        data: transactionResponse,
      }));

      const testAccount = TestAccount();
      await testAccount.getAccount();
      const result = await testAccount.postTransaction({ transactionType: 'credit', amount: 1000000 }, getCustomer());

      expect(result.data.transactionId).toBe('T00000006');
      expect(result.status).toBe(201);
    });

    it('should failed post transaction to API', async () => {
      const respAccount = {
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

      axios.get.mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respAccount,
      }));


      const transactionResponse = {
        timestamp: '2018-09-22T20:03:33.670+0000', status: 403, error: 'Forbidden', message: 'Insufficient balance', path: '/transactions',
      };
      axios.post.mockImplementationOnce(() => Promise.reject({
        response: {
          status: 403,
          data: transactionResponse,
        },
      }));


      const testAccount = TestAccount();
      await testAccount.getAccount();
      let result;
      try {
        result = await testAccount.postTransaction({ transactionType: 'credit', amount: 1000000 }, getCustomer());
      } catch (e) {
        result = e;
      }


      expect(result.status).toBe(403);
      expect(result.data).toBe('Insufficient balance');
    });
  });

  describe('postTransfer', async () => {
    it('should success post transfer to API', async () => {
      const respAccount = {
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

      axios.get.mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respAccount,
      }));


      const transactionResponse = {
        transactionId: 'T00000006',
        debit: {
          accountId: 'A00000003',
          customer: {
            customerId: 'C00000002', name: 'nofanto', info: 'chip', disabled: false,
          },
          balance: { amount: 1.1E7, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000001', name: 'nofanto', info: 'chip', disabled: false,
          },
          balance: { amount: 1.1E7, currency: 'IDR' },
        },
        dateTime: '2018-09-15T19:02:17.035',
        transactionAmount: { amount: 1000000.0, currency: 'IDR' },
      };
      axios.post.mockImplementationOnce(() => Promise.resolve({
        status: 201,
        data: transactionResponse,
      }));

      const testAccount = TestAccount();
      await testAccount.getAccount();
      const result = await testAccount.postTransaction({ transactionType: 'credit', amount: 1000000 }, getCustomer());

      expect(result.data.transactionId).toBe('T00000006');
      expect(result.status).toBe(201);
    });

    it('should failed post transfer to API', async () => {
      const respAccount = {
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

      axios.get.mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respAccount,
      }));


      const transactionResponse = {
        timestamp: '2018-09-22T20:03:33.670+0000', status: 403, error: 'Forbidden', message: 'Insufficient balance', path: '/transactions',
      };
      axios.post.mockImplementationOnce(() => Promise.reject({
        response: {
          status: 403,
          data: transactionResponse,
        },
      }));


      const testAccount = TestAccount();
      await testAccount.getAccount();
      let result;
      try {
        result = await testAccount.postTransaction({ transactionType: 'credit', amount: 1000000 }, getCustomer());
      } catch (e) {
        result = e;
      }


      expect(result.status).toBe(403);
      expect(result.data).toBe('Insufficient balance');
    });
  });
});
