import AccountService from "./accountService";
import axios from 'axios';
import Constant from "../Utilities/Constant";
import Endpoint from "./Endpoint";

jest.mock('axios');

describe('accountService', () => {

    const TestAccount = () =>{
        return new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
    };

    function getCustomer() {
        return {
            accountId: '',
            customer: {
                customerId: '',
                name: '',
                info: '',
                disabled: ''
            },
            balance: {
                amount: '',
                currency: ''
            }

        };
    }

    describe('getAccountBalance', async () => {
        it('should get account balance from API', async function () {
            const resp = {
                "accountId": "A00000001",
                "customer": {
                    "customerId": "C00000001",
                    "name": "Dj",
                    "info": "chip",
                    "disabled": false
                },
                "balance": {
                    "amount": 5000000,
                    "currency": "IDR"
                }
            };
            axios.get.mockImplementationOnce(() => Promise.resolve({
                status: 200,
                data: resp
            }));

            let testAccount = TestAccount();

            let result = await testAccount.getAccount();

            expect(result.status).toBe(200);
            expect(result.data.balance.amount).toBe(5000000.0);
            expect(result.data.balance.currency).toBe("IDR");
        });
    });

    describe('getCustomerInfo', async () => {
        it('should fetch info of customer account from API', async function () {
            const resp = {
                "accountId": "A00000001",
                "customer": {
                    "customerId": "C00000001",
                    "name": "Dj",
                    "info": "chip",
                    "disabled": false
                },
                "balance": {
                    "amount": 5000000,
                    "currency": "IDR"
                }
            };
            axios.get.mockImplementationOnce(() => Promise.resolve({
                status: 200,
                data: resp
            }));

            let testAccount = TestAccount();

            let result = await testAccount.getAccount();

            expect(result.status).toBe(200);
            expect(result.data.customer.customerId).toBe("C00000001");
            expect(result.data.customer.name).toBe("Dj");
        });
    });

    describe('getLastFiveTransactionList', () =>{
        it('should fetch last 5 transactions of customer account', async () => {
            let transactionList = [{"transactionId":"T00000007","debit":{"accountId":"A00000001","customer":{"customerId":"C00000002","name":"customer 1","info":"customer 1 info","disabled":false},"balance":{"amount":1500000.0,"currency":"IDR"}},"credit":{"accountId":"A00000002","customer":{"customerId":"C00000004","name":"customer 2","info":"customer 2 info","disabled":false},"balance":{"amount":8500000.0,"currency":"IDR"}},"dateTime":"2018-09-15T16:22:04.601","transactionAmount":{"amount":500000.0,"currency":"IDR"}},{"transactionId":"T00000006","debit":"A00000001","credit":"A00000002","dateTime":"2018-09-15T16:22:04.569","transactionAmount":{"amount":500000.0,"currency":"IDR"}},{"transactionId":"T00000005","debit":"A00000001","credit":"A00000002","dateTime":"2018-09-15T16:22:04.537","transactionAmount":{"amount":500000.0,"currency":"IDR"}},{"transactionId":"T00000004","debit":"A00000002","credit":"A00000001","dateTime":"2018-09-15T16:22:04.509","transactionAmount":{"amount":500000.0,"currency":"IDR"}},{"transactionId":"T00000003","debit":"A00000001","credit":"A00000002","dateTime":"2018-09-15T16:22:04.485","transactionAmount":{"amount":500000.0,"currency":"IDR"}}];
            axios.get.mockImplementationOnce(() => Promise.resolve({
                status: 200,
                data : transactionList
            }));

            let testAccount = TestAccount();

            let result = await testAccount.getLastFiveTransactionList();

            expect(result.status).toBe(200);
            expect(result.data.length).toBe(5);
            expect(result.data[0].transactionId).toBe("T00000007");
            expect(result.data[3].type).toBe("credit");
            expect(result.data[4].type).toBe("debit");

        })
    });

    describe('postTransaction', async () => {
        it('should success post transaction to API', async () => {

            const respAccount = {
                "accountId": "A00000001",
                "customer": {
                    "customerId": "C00000001",
                    "name": "Dj",
                    "info": "chip",
                    "disabled": false
                },
                "balance": {
                    "amount": 5000000,
                    "currency": "IDR"
                }
            }

            axios.get.mockReturnValueOnce(Promise.resolve({
                status: 200,
                data: respAccount
            }));


            let transactionResponse = {"transactionId":"T00000006","debit":null,"credit":{"accountId":"A00000001","customer":{"customerId":"C00000001","name":"nofanto","info":"chip","disabled":false},"balance":{"amount":1.1E7,"currency":"IDR"}},"dateTime":"2018-09-15T19:02:17.035","transactionAmount":{"amount":1000000.0,"currency":"IDR"}};
            axios.post.mockImplementationOnce(() => Promise.resolve({
                status:201,
                data: transactionResponse
            }));

            let testAccount = TestAccount();
            await testAccount.getAccount();
            let result = await testAccount.postTransaction({type: 'credit', amount: 1000000}, getCustomer());

            expect(result.data.transactionId).toBe('T00000006');
            expect(result.status).toBe(201);

        });

        it('should failed post transaction to API', async () => {

            const respAccount = {
                "accountId": "A00000001",
                "customer": {
                    "customerId": "C00000001",
                    "name": "Dj",
                    "info": "chip",
                    "disabled": false
                },
                "balance": {
                    "amount": 5000000,
                    "currency": "IDR"
                }
            };

            axios.get.mockReturnValueOnce(Promise.resolve({
                status: 200,
                data: respAccount
            }));


            let transactionResponse = {"timestamp":"2018-09-22T20:03:33.670+0000","status":403,"error":"Forbidden","message":"Insufficient balance","path":"/transactions"};
            axios.post.mockImplementationOnce(() => Promise.reject({
                response: {
                    status: 403,
                    data: transactionResponse
                }
            }));


            let testAccount = TestAccount();
            await testAccount.getAccount();
            let result;
            try {
                result = await testAccount.postTransaction({type: 'credit', amount: 1000000}, getCustomer());
            }
            catch (e) {
                result = e;
            }


            expect(result.status).toBe(403);
            expect(result.data).toBe('Insufficient balance');
        });
    });

    describe('postTransfer', async () => {
        it('should success post transfer to API', async () => {

            const respAccount = {
                "accountId": "A00000001",
                "customer": {
                    "customerId": "C00000001",
                    "name": "Dj",
                    "info": "chip",
                    "disabled": false
                },
                "balance": {
                    "amount": 5000000,
                    "currency": "IDR"
                }
            };

            axios.get.mockReturnValueOnce(Promise.resolve({
                status: 200,
                data: respAccount
            }));


            let transactionResponse = {"transactionId":"T00000006","debit":{"accountId":"A00000003","customer":{"customerId":"C00000002","name":"nofanto","info":"chip","disabled":false},"balance":{"amount":1.1E7,"currency":"IDR"}},"credit":{"accountId":"A00000001","customer":{"customerId":"C00000001","name":"nofanto","info":"chip","disabled":false},"balance":{"amount":1.1E7,"currency":"IDR"}},"dateTime":"2018-09-15T19:02:17.035","transactionAmount":{"amount":1000000.0,"currency":"IDR"}};
            axios.post.mockImplementationOnce(() => Promise.resolve({
                status:201,
                data: transactionResponse
            }));

            let testAccount = TestAccount();
            await testAccount.getAccount();
            let result = await testAccount.postTransaction({type: 'credit', amount: 1000000}, getCustomer());

            expect(result.data.transactionId).toBe('T00000006');
            expect(result.status).toBe(201);

        });

        it('should failed post transfer to API', async () => {

            const respAccount = {
                "accountId": "A00000001",
                "customer": {
                    "customerId": "C00000001",
                    "name": "Dj",
                    "info": "chip",
                    "disabled": false
                },
                "balance": {
                    "amount": 5000000,
                    "currency": "IDR"
                }
            };

            axios.get.mockReturnValueOnce(Promise.resolve({
                status: 200,
                data: respAccount
            }));


            let transactionResponse = {"timestamp":"2018-09-22T20:03:33.670+0000","status":403,"error":"Forbidden","message":"Insufficient balance","path":"/transactions"};
            axios.post.mockImplementationOnce(() => Promise.reject({
                response: {
                    status: 403,
                    data: transactionResponse
                }
            }));


            let testAccount = TestAccount();
            await testAccount.getAccount();
            let result;
            try {
                result = await testAccount.postTransaction({type: 'credit', amount: 1000000}, getCustomer());
            }
            catch (e) {
                result = e;
            }


            expect(result.status).toBe(403);
            expect(result.data).toBe('Insufficient balance');
        });
    });
});