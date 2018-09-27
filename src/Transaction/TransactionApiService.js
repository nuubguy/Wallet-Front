import axios from 'axios';
import Endpoint from "../Api/Endpoint";

/*
    This class represent API call to post or get transaction
 */

export default class TransactionApiService {
    static postTransaction(transaction, id) {
        return axios.post(Endpoint.postTransaction(transaction.type, id), {
            customer: {
                id: transaction.customer.id
            },
            type: transaction.type,
            nominal: transaction.amount
        });
    }

    static getLastFiveTransactions(id) {
        return axios.get(Endpoint.getLastFiveTransactions(id))
            .then(response => response.data);
    }
}
