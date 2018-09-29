import axios from "axios";
import Constant from "../Utilities/Constant";

export default class AccountService{
    constructor(customerId, accountId, baseUrl){
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

    static axiosGet(url){
        return axios.get(url);
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

    postTransaction(transaction, customer){
        console.log(transaction);
        let accountId = this.accountId;
        let customerId = this.customerId;
        let balance = customer.balance.amount;

        let headers = {
            'Content-Type': 'application/json'
        };

        let getTransactionType = (transactionType, targetType) => {
            if(transactionType === targetType){
                return {
                    accountId: accountId,
                    customer: {
                        customerId: customerId,
                        name: customer.name,
                        info: customer.customer.info,
                        disabled: customer.customer.disabled
                    }
                }
            }
            return null;
        };

        let transactionRequest = {
            transactionId: null,
            credit: getTransactionType(transaction.transactionType, Constant.credit()),
            debit: getTransactionType(transaction.transactionType, Constant.debit()),
            balance: {
                amount: balance,
                currency: 'IDR'
            },
            dateTime: null,
            transactionAmount: {
                amount: transaction.amount,
                currency: 'IDR'
            },
            description: transaction.description
        };

        let postTransactionUrl = `${this.baseUrl}/transactions`;
        return axios.post(postTransactionUrl, transactionRequest, {headers : headers});

    }
}
