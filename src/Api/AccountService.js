import axios from "axios";
import Constant from "../Utilities/Constant";

export default class AccountService {
    constructor(customerId, accountId, baseUrl) {
        this.customerId = customerId;
        this.accountId = accountId;
        this.baseUrl = baseUrl;
    }

    async getAccount() {
        const accountId = this.accountId;
        const customerId = this.customerId;
        const baseUrl = this.baseUrl;
        const balanceUrl = `${baseUrl}/customers/${customerId}/accounts/${accountId}`;
        try {
            let result = await AccountService.axiosGet(balanceUrl);
            this.account = result.data;
            return result;

        } catch (error) {
            throw error;
        }
    }

    static axiosGet(url) {
        return axios.get(url);
    }

    getLastFiveTransactionList() {
        let accountId = this.accountId;
        let baseUrl = this.baseUrl;
        let transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=5`;
        return axios.get(transactionListUrl).then((response) => {
            return {
                status: response.status,
                data: response.data.map((item) => {
                    function getTransactionType(item) {
                        if (item.credit === accountId || item.credit.accountId === accountId) {
                            return Constant.credit();
                        }

                        if (item.debit === accountId || item.debit.accountId === accountId) {
                            return Constant.debit();
                        }
                    }

                    return {
                        transactionId: item.transactionId,
                        type: getTransactionType(item),
                        dateTime: item.dateTime,
                        amount: item.transactionAmount.amount,
                        currency: item.transactionAmount.currency,
                        description: item.description.length === 0 ? '-' : item.description,
                    }
                })
            }
        });
    }


    getAllTransactionList(sort) {
        const accountId = this.accountId;
        const baseUrl = this.baseUrl;
        let transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=&description=&amount=&status=${sort}`;
        if (sort===0){
            transactionListUrl= `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=&description=&amount=&status=`;
        }

        return axios.get(transactionListUrl).then(response => ({
            status: response.status,
            data: response.data.map((item) => {
                function getTransactionType(item) {
                    if (item.credit === accountId || item.credit.accountId === accountId) {
                        return 'credit';
                    }

                    if (item.debit === accountId || item.debit.accountId === accountId) {
                        return 'debit';
                    }
                }

                return {
                    transactionId: item.transactionId,
                    transactionType: getTransactionType(item),
                    dateTime: item.dateTime,
                    amount: item.transactionAmount.amount,
                    currency: item.transactionAmount.currency,
                    description: item.description,
                };
            }),
        }));
    }


    getTransactionListBasedOnDescription(description,sort) {
        const accountId = this.accountId;
        const baseUrl = this.baseUrl;
        const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=${description}&amount=&status=${sort}`;
        return axios.get(transactionListUrl).then(response => ({
            status: response.status,
            data: response.data.map((item) => {
                function getTransactionType(item) {
                    if (item.credit === accountId || item.credit.accountId === accountId) {
                        return 'credit';
                    }

                    if (item.debit === accountId || item.debit.accountId === accountId) {
                        return 'debit';
                    }
                }

                return {
                    transactionId: item.transactionId,
                    transactionType: getTransactionType(item),
                    dateTime: item.dateTime,
                    amount: item.transactionAmount.amount,
                    currency: item.transactionAmount.currency,
                    description: item.description,
                };
            }),
        }));
    }

    getTransactionListBasedOnAmount(amount,sort) {
        const accountId = this.accountId;
        const baseUrl = this.baseUrl;
        const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=&amount=${parseFloat(amount)}&status=${sort}`;
        return axios.get(transactionListUrl).then(response => ({
            status: response.status,
            data: response.data.map((item) => {
                function getTransactionType(item) {
                    if (item.credit === accountId || item.credit.accountId === accountId) {
                        return 'credit';
                    }

                    if (item.debit === accountId || item.debit.accountId === accountId) {
                        return 'debit';
                    }
                }

                return {
                    transactionId: item.transactionId,
                    transactionType: getTransactionType(item),
                    dateTime: item.dateTime,
                    amount: item.transactionAmount.amount,
                    currency: item.transactionAmount.currency,
                    description: item.description,
                };
            }),
        }));
    }

    getTransactionListBasedOnAmountAndDescription(amount, description) {
        const accountId = this.accountId;
        const baseUrl = this.baseUrl;
        const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=${description}&amount=${amount}`;
        return axios.get(transactionListUrl).then(response => ({
            status: response.status,
            data: response.data.map((item) => {
                function getTransactionType(item) {
                    if (item.credit === accountId || item.credit.accountId === accountId) {
                        return 'credit';
                    }

                    if (item.debit === accountId || item.debit.accountId === accountId) {
                        return 'debit';
                    }
                }

                return {
                    transactionId: item.transactionId,
                    transactionType: getTransactionType(item),
                    dateTime: item.dateTime,
                    amount: item.transactionAmount.amount,
                    currency: item.transactionAmount.currency,
                    description: item.description,
                };
            }),
        }));
    }

    getAllAndSortByAmount() {
        const accountId = this.accountId;
        const baseUrl = this.baseUrl;
        const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=&amount=&status=1`;
        return axios.get(transactionListUrl).then(response => ({
            status: response.status,
            data: response.data.map((item) => {
                function getTransactionType(item) {
                    if (item.credit === accountId || item.credit.accountId === accountId) {
                        return 'credit';
                    }

                    if (item.debit === accountId || item.debit.accountId === accountId) {
                        return 'debit';
                    }
                }

                return {
                    transactionId: item.transactionId,
                    transactionType: getTransactionType(item),
                    dateTime: item.dateTime,
                    amount: item.transactionAmount.amount,
                    currency: item.transactionAmount.currency,
                    description: item.description,
                };
            }),
        }));
    }




    postTransaction(transaction, customer) {
        let accountId = this.accountId;
        let customerId = this.customerId;
        let balance = customer.balance.amount;

        let headers = {
            'Content-Type': 'application/json'
        };

        let getTransactionType = (transactionType, targetType) => {
            if (transactionType === targetType) {
                return this.accountId;
            }
            return "";
        };

        let transactionRequest = {
            debitAccountId: getTransactionType(transaction.type, Constant.debit()),
            creditAccountId: getTransactionType(transaction.type, Constant.credit()),
            transactionId: null,
            dateTime: null,
            description: transaction.description,
            transactionAmount: {
                amount: transaction.amount,
                currency: Constant.currency()
            },

        };

        let postTransactionUrl = `${this.baseUrl}/transactions`;
        return axios.post(postTransactionUrl, transactionRequest, {headers: headers})
            .then((response) => {
                return {
                    status: response.status,
                    data: response.data
                }
            }).catch((error) => {
                let errorData;

                if (error.response.status === 403) {
                    errorData = error.response.data.message;
                }

                if (error.response.status === 400) {
                    errorData = error.response.data.errors[0].defaultMessage;
                }

                let friendlyError = {
                    status: error.response.status,
                    data: errorData
                };

                throw friendlyError;
            });
    }

    postTransfer(transaction, payee) {
        console.log(this.accountId);
        console.log(payee);
        let headers = {
            'Content-Type': 'application/json'
        };


        let transferRequest = {
            debitAccountId: this.accountId,
            creditAccountId: payee,
            transactionId: null,
            dateTime: null,
            description: transaction.description,
            transactionAmount: {
                amount: transaction.amount,
                currency: Constant.currency()
            },

        };

        let postTransactionUrl = `${this.baseUrl}/transactions`;
        return axios.post(postTransactionUrl, transferRequest, {headers: headers})
            .then((response) => {
                return {
                    status: response.status,
                    data: response.data
                }
            }).catch((error) => {
                let errorData;

                if (error.response.status === 403) {
                    errorData = error.response.data.message;
                }

                if (error.response.status === 400) {
                    errorData = error.response.data.errors[0].defaultMessage;
                }

                let friendlyError = {
                    status: error.response.status,
                    data: errorData
                };

                throw friendlyError;
            });
    }
}
