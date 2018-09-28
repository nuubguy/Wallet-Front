/*
    This class represent endpoints for any API request
 */

export default class Endpoint {
    static baseUrl() {
        return 'http://localhost:8080';
    }

    // static postTransaction() {
    //     return 'http://localhost:8080/transactions';
    // }
    //
    // static getLastFiveTransactions(id) {
    //     return 'http://localhost:8080/transactions/?accountId=' + id + '&limitResultFromLatest=5';
    // }
}
