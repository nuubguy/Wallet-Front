import React, {Component} from "react";
import Dashboard from "./Dashboard";
import Customer from "../Utilities/Customer";
import AccountService from "../Api/AccountService";
import Endpoint from "../Api/Endpoint";

/*
    This class represent logic to serve Dashboard class
 */

export default class DashboardContainer extends Component {
    constructor() {
        super();
        this.state = {
            customer: {
                account: {
                    amount: '',
                    currency: ''
                },
                name: ''
            },
            transactions: [],
            service: ''
        }
    }

    render() {
        return (
            <div>
                <Dashboard customer={this.state.customer} transactions={this.state.transactions}/>
            </div>
        )
    }

    componentDidMount() {
        const service = new AccountService(Customer.id(), Customer.accountId(), Endpoint.baseUrl());

        this.getCustomerData(service);
        this.getLastFiveTransaction(service);
    }

    async getCustomerData(service) {
        const response = await service.getCustomerInfo();

        let customer = Object.assign({}, this.state.customer);
        customer.name =response.data.customer.name;
        customer.account.amount = response.data.balance.amount;

        this.setState({customer});
    }

    async getLastFiveTransaction(service) {
        const response = await service.getTransactionList();
        this.setState({transactions: response.data});
    }
}
