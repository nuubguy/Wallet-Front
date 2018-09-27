import axios from 'axios';
import Endpoint from "../Api/Endpoint";

/*
    This class represent API call to get customer data
 */

export default class CustomerService {
    static fetchCustomer(id) {
        return axios.get(Endpoint.getCustomer(id))
            .then(response => response.data);
    }
}
