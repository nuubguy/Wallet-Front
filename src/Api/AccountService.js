import axios from "axios";

export default class AccountService{
    constructor(customerId, accountId, baseUrl){
        this.customerId = customerId;
        this.accountId = accountId;
        this.baseUrl = baseUrl;
    }

    getAccount() {
        const accountId = this.accountId;
        const customerId = this.customerId;
        const baseUrl = this.baseUrl;
        const balanceUrl = `${baseUrl}/customers/${customerId}/accounts/${accountId}`;
        return axios.get(balanceUrl);
    }

    getTransactionList() {
        let accountId = this.accountId;
        let baseUrl = this.baseUrl;
        let transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=5`;
        return axios.get(transactionListUrl).then((response) =>{
            return {
                status: response.status,
                data: response.data.map((item) =>{
                    function getTransactionType(item) {
                        if(item.credit === accountId || item.credit.accountId === accountId){
                            return 'credit';
                        }

                        if(item.debit === accountId || item.debit.accountId === accountId){
                            return 'debit';
                        }
                    }

                    return {
                        transactionId: item.transactionId,
                        transactionType: getTransactionType(item),
                        dateTime: item.dateTime,
                        amount: item.transactionAmount.amount,
                        currency: item.transactionAmount.currency,
                        description: item.description
                    }
                })
            }
        });
    }

    postTransaction(transaction){
        let accountId = this.accountId;
        let customerId = this.customerId;
        let balance = this.balance;

        let headers = {
            'Content-Type': 'application/json'
        };

        let getTransactionType = (transactionType, targetType) => {
            if(transactionType === targetType){
                return {
                    accountId: accountId,
                    customer: {
                        customerId: customerId,
                        name: this.customerInfo.name,
                        info: this.customerInfo.info,
                        disabled: this.customerInfo.disabled
                    }
                }
            }
           return null;
        };

        let transactionRequest = {
            transactionId: null,
            credit: getTransactionType(transaction.transactionType, 'credit'),
            debit: getTransactionType(transaction.transactionType, 'debit'),
            balance: {
                amount: balance,
                currency: 'IDR'
            },
            dateTime: null,
            transactionAmount: {
                amount: transaction.amount,
                currency: 'IDR'
            }
        };

        let postTransactionUrl = `${this.baseUrl}/transactions`;
        return axios.post(postTransactionUrl, transactionRequest, {headers : headers});

    }
}
