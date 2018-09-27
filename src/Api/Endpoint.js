/*
    This class represent endpoints for any API request
 */

export default class Endpoint {
    static getCustomer(id) {
        return 'http://localhost:8080/customers/' + id;
    }

    static postTransaction(transactionType, id) {
        return 'http://localhost:8080/transaction/' + transactionType + "/" + id;
    }

    static getLastFiveTransactions(id) {
        return 'http://localhost:8080/transaction/last-five/' + id;
    }
}
