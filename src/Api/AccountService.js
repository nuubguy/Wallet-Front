import axios from 'axios';
import Constant from '../Utilities/Constant';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default class AccountService {
  constructor(customerId, accountId, baseUrl) {
    this.customerId = customerId;
    this.accountId = accountId;
    this.baseUrl = baseUrl;
  }

  async getAccount() {
    const accountId = localStorage.getItem('accountId');
    const customerId = localStorage.getItem('customerId');
    const baseUrl = this.baseUrl;
    const balanceUrl = `${baseUrl}/customers/${customerId}/accounts/${accountId}`;
    try {
      const result = await AccountService.axiosGet(balanceUrl, {
        auth: {
          username: localStorage.getItem('customerId'),
          password: localStorage.getItem('password'),
        },
      });
      this.account = result.data;
      return result;
    } catch (error) {
      throw error;
    }
  }

  static axiosGet(url, cred) {
    return axios.get(url, cred);
  }

  getAccountProfile(customerId, password) {
    const getCustomerUrl = `/customers/${customerId}`;
    const result = axios.get(getCustomerUrl, {
      auth: {
        username: customerId,
        password,
      },
    });
    this.account = result.data;
    return result;
  }

  getLastFiveTransactionList() {
    const accountId = localStorage.getItem('accountId');
    const baseUrl = this.baseUrl;
    const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=5`;
    return axios.get(transactionListUrl, {
      auth: {
        username: localStorage.getItem('customerId'),
        password: localStorage.getItem('password'),
      },
    }).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return Constant.credit();
            }
            return `${Constant.debit()} from`;
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return Constant.debit();
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          type: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description === '' ? '-' : item.description,
          subType: getSubTransactionType(item),
        };
      }),
    }));
  }


  getAllTransactionList(sort) {
    const accountId = localStorage.getItem('accountId');
    const baseUrl = this.baseUrl;
    let transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=&description=&amount=&status=${sort}`;
    if (sort === 0) {
      transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=&description=&amount=&status=`;
    }

    return axios.get(transactionListUrl, {
      auth: {
        username: localStorage.getItem('customerId'),
        password: localStorage.getItem('password'),
      },
    }).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return Constant.credit();
            }
            return `${Constant.debit()} from`;
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return Constant.debit();
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          type: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description === '' ? '-' : item.description,
          subType: getSubTransactionType(item),
        };
      }),
    }));
  }


  getTransactionListBasedOnDescription(description, sort) {
    const accountId = localStorage.getItem('accountId');
    const baseUrl = this.baseUrl;
    const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=${description}&amount=&status=${sort}`;
    return axios.get(transactionListUrl, {
      auth: {
        username: localStorage.getItem('customerId'),
        password: localStorage.getItem('password'),
      },
    }).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return Constant.credit();
            }
            return `${Constant.debit()} from`;
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return Constant.debit();
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          type: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description === '' ? '-' : item.description,
          subType: getSubTransactionType(item),
        };
      }),
    }));
  }

  getTransactionListBasedOnAmount(amount, sort) {
    const accountId = localStorage.getItem('accountId');
    const baseUrl = this.baseUrl;
    const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=&amount=${parseFloat(amount)}&status=${sort}`;
    return axios.get(transactionListUrl, {
      auth: {
        username: localStorage.getItem('customerId'),
        password: localStorage.getItem('password'),
      },
    }).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return Constant.credit();
            }
            return `${Constant.debit()} from`;
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return Constant.debit();
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          type: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description === '' ? '-' : item.description,
          subType: getSubTransactionType(item),
        };
      }),
    }));
  }

  getTransactionListBasedOnAmountAndDescription(amount, description) {
    const accountId = localStorage.getItem('accountId');
    const baseUrl = this.baseUrl;
    const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=${description}&amount=${amount}`;
    return axios.get(transactionListUrl, {
      auth: {
        username: localStorage.getItem('customerId'),
        password: localStorage.getItem('password'),
      },
    }).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return Constant.credit();
            }
            return `${Constant.debit()} from`;
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return Constant.debit();
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          type: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description === '' ? '-' : item.description,
          subType: getSubTransactionType(item),
        };
      }),
    }));
  }

  postTransaction(transaction) {
    const accountId = localStorage.getItem('accountId');
    const headers = {
      'Content-Type': 'application/json',
    };

    const getTransactionType = (transactionType, targetType) => {
      if (transactionType === targetType) {
        return accountId;
      }
      return '';
    };

    const transactionRequest = {
      debitAccountId: getTransactionType(transaction.type, Constant.debit()),
      creditAccountId: getTransactionType(transaction.type, Constant.credit()),
      transactionId: null,
      dateTime: null,
      description: transaction.description,
      transactionAmount: {
        amount: transaction.amount,
        currency: Constant.currency(),
      },

    };

    const postTransactionUrl = `${this.baseUrl}/transactions`;
    return axios.post(postTransactionUrl, transactionRequest, { headers })
      .then(response => ({
        status: response.status,
        data: response.data,
      })).catch((error) => {
        let errorData;

        if (error.response.status === 403) {
          errorData = error.response.data.message;
        }

        if (error.response.status === 400) {
          errorData = error.response.data.errors[0].defaultMessage;
        }

        const friendlyError = {
          status: error.response.status,
          data: errorData,
        };

        throw friendlyError;
      });
  }

  postTransfer(transaction, payee) {
    const accountId = localStorage.getItem('accountId');
    const headers = {
      'Content-Type': 'application/json',
    };


    const transferRequest = {
      debitAccountId: accountId,
      creditAccountId: payee,
      transactionId: null,
      dateTime: null,
      description: transaction.description,
      transactionAmount: {
        amount: transaction.amount,
        currency: Constant.currency(),
      },

    };

    const postTransactionUrl = `${this.baseUrl}/transactions`;
    return axios.post(postTransactionUrl, transferRequest, { headers })
      .then(response => ({
        status: response.status,
        data: response.data,
      })).catch((error) => {
        let errorData;

        if (error.response.status === 403) {
          errorData = error.response.data.message;
        }

        if (error.response.status === 400) {
          errorData = error.response.data.errors[0].defaultMessage;
        }

        const friendlyError = {
          status: error.response.status,
          data: errorData,
        };

        throw friendlyError;
      });
  }

  getCustomer(accountId) {
    const getCustomerUrl = `${this.baseUrl}/accounts?accountId=${accountId}`;
    try {
      const result = AccountService.axiosGet(getCustomerUrl);
      this.account = result.data;

      return result;
    } catch (error) {
      throw error;
    }
  }

  putPayee(payees) {
    console.log(payees);
    const accountId = localStorage.getItem('accountId');
    const customerId = localStorage.getItem('customerId');

    const headers = {
      'Content-Type': 'application/json',
    };

    const transferRequest = {
      accountId,
      payees,
    };

    console.log(transferRequest);

    const putPayeeUrl = `${this.baseUrl}/customers/${customerId}/accounts`;

    return axios.put(putPayeeUrl, transferRequest, { headers })
      .then(response => ({
        status: response.status,
        data: response.data,
      }))
      .catch((error) => {
        console.log(error);
      });
  }
}
