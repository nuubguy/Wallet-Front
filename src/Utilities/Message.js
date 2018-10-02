/*
    This class represent feedback of transaction activity
 */

export default class Message {
    static TransactionSuccess() {
        return 'Transfer Success';
    }

    static TransactionFail() {
        return 'Transfer Fail';
    }
}
