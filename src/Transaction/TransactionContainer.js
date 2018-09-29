import Transaction from "./Transaction";
import React, {Component} from "react";
import TransactionStatus from "./TransactionStatus";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import Withdraw from "./Withdraw";
import DashboardContainer from "../Dashboard/DashboardContainer";
import {Route} from "react-router-dom";
import Router from "react-router-dom/es/Router";

/*
    This class represent logic to serve Transaction, TransactionList, and TransactionStatus class
 */

export default class TransactionContainer extends Component {
    constructor() {
        super();
        this.state = {
            transaction: {
                transactionType: Constant.debit(),
                amount: '',
                description: ''
            },
            customer: {
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
            }
        }
    }

    render() {
        return (
            <div>
                <TransactionStatus
                    transactionStatus={this.state.transactionStatus}
                />

                <Route path="/transaction/withdraw" render={() => (
                    <Withdraw
                        onAmountChange={this.onAmountChange}
                        onDescriptionChange={this.onDescriptionChange}
                        onFormSubmit={this.onFormSubmit}
                        customer={this.state.customer}
                    />
                )}/>
            </div>
        )
    }

    onAmountChange = (amount) => {
        let transaction = Object.assign({}, this.state.transaction);
        transaction.amount = amount;

        this.setState({transaction});
    };

    onDescriptionChange = (description) => {
        let transaction = Object.assign({}, this.state.transaction);
        transaction.description = description;

        this.setState({transaction});
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        service.postTransaction(this.state.transaction, this.state.customer)
            .then((response) => {
                console.log(response);
            })
            .catch((response) => {
                console.log(response);
            });
    };

    componentDidMount() {
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        this.getCustomerData(service);
    }

    async getCustomerData(service) {
        const response = await service.getAccount();
        this.setState({customer: response.data});
    }
}
