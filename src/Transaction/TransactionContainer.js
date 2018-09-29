import React, {Component} from "react";
import TransactionStatus from "./TransactionStatus";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import {Route} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Transaction from "./Transaction";
import './TransactionContainer.css'

/*
    This class represent logic to serve Transaction, TransactionList, and TransactionStatus class
 */

export default class TransactionContainer extends Component {
    constructor() {
        super();
        this.state = {
            transaction: {
                transactionType: '',
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
                    <div className={"transaction-container"}>
                        <h2><FontAwesomeIcon icon={"money-bill-wave"}/> Withdraw money</h2>
                        <Transaction
                            onAmountChange={this.onAmountChange}
                            onDescriptionChange={this.onDescriptionChange}
                            onFormSubmit={this.onWithdrawFormSubmit}
                            customer={this.state.customer}
                        />
                    </div>
                )}/>

                <Route path="/transaction/top-up" render={() => (
                    <div className={"transaction-container"}>
                        <h2><FontAwesomeIcon icon={"money-bill-wave"}/> Top up money</h2>
                        <Transaction
                            onAmountChange={this.onAmountChange}
                            onDescriptionChange={this.onDescriptionChange}
                            onFormSubmit={this.onTopUpFormSubmit}
                            customer={this.state.customer}
                        />
                    </div>
                )}/>
            </div>
        )
    }

    onWithdrawFormSubmit = async (event) => {
        event.preventDefault();
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());

        this.state.transaction.transactionType = Constant.debit();
        //this.setTransactionType(Constant.debit());

        await service.postTransaction(this.state.transaction, this.state.customer);
        this.setState({transaction: {transactionType: '', amount: '', description: ''}});
        this.refresh();

    };

    onTopUpFormSubmit = async (event) => {
        event.preventDefault();
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());

        let transaction = {...this.state.transaction};
        transaction.transactionType = 'debit';
        this.setState({transaction});

        await service.postTransaction(this.state.transaction, this.state.customer);
        this.setState({transaction: {transactionType: '', amount: '', description: ''}});
        this.refresh();
    };

    componentDidMount() {
        this.refresh()
    }

    refresh() {
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        this.getCustomerData(service);
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
    };

    setTransactionType = (type) => {
        let transaction = Object.assign({}, this.state.transaction);
        transaction.description = type;

        this.setState({transaction});
    };

    async getCustomerData(service) {
        const response = await service.getAccount();
        this.setState({customer: response.data});
    };
}
