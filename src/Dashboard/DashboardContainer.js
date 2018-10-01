import React, {Component} from "react";
import Dashboard from "./Dashboard";
import Constant from "../Utilities/Constant";
import AccountService from "../Api/AccountService";
import Endpoint from "../Api/Endpoint";

/*
    This class represent logic to serve Dashboard page
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
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());

        this.getCustomerData(service);
        this.getLastFiveTransaction(service);
    }

    async getCustomerData(service) {
        const response = await service.getAccount();
        let customer = Object.assign({}, this.state.customer);
        customer.name = response.data.customer.name;
        customer.account.amount = response.data.balance.amount;
        customer.account.currency = response.data.balance.currency;

        this.setState({customer});
    }

    async getLastFiveTransaction(service) {
        const response = await service.getLastFiveTransactionList();
        this.setState({transactions: response.data});
    }
}
