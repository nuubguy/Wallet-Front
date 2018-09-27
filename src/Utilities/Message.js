/*
    This class represent feedback of transaction activity
 */

export default class Message {
    static TransactionSuccess() {
        return 'Transaction Success';
    }

    static TransactionFail() {
        return 'Transaction Fail';
    }
}
