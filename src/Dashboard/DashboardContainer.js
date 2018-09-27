import React, {Component} from "react";
import Dashboard from "./Dashboard";
import Customer from "../Utilities/Customer";
import DashboardApiService from "./DashboardApiService";

/*
    This class represent logic to serve Dashboard class
 */

export default class DashboardContainer extends Component {
    constructor() {
        super();
        this.state = {
            customer: {
                name: '',
                balance: ''
            }
        }
    }

    render() {
        return (
            <div>
                <Dashboard customer={this.state.customer}/>
            </div>
        )
    }

    async componentDidMount() {
        await this.getCustomerData();
    }

    getCustomerData() {
        DashboardApiService.fetchCustomer(Customer.id())
            .then((response) => {
                this.updateCustomerInfo(response);
            });
    }

    updateCustomerInfo(response) {
        let customer = Object.assign({}, this.state.customer);
        customer.name = response.name;
        customer.balance = response.wallet.balance;

        this.setState({customer});
    }
}
