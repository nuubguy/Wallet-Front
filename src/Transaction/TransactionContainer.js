import React, {Component} from "react";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import {Route} from "react-router-dom";
import imageResource from "../Resource/Resource.js";
import Transaction from "./Transaction";
import './TransactionContainer.css'

/*
    This class represent logic to serve withdraw and top up page
 */

export default class TransactionContainer extends Component {
    constructor() {
        super();
        this.state = {
            transaction: {
                type: '',
                amount: '',
                description: ''
            },
            customer: {
                balance: {
                    amount: '',
                    currency: ''
                }
            },
            response: {
                display: false,
                status: '',
                message: ''
            }
        }
    }

    render() {
        return (
            <div className={"transaction-container"}>
                <Route path="/transaction/withdraw" render={() => (
                    <div className={"container"}>
                        <h2 className={"transaction-title"}>
                            <img src={imageResource.WITHDRAW} className={"icon"} alt={"withdraw-icon"}/>
                            &nbsp;
                            <span>Withdraw money</span>
                        </h2>
                        < Transaction
                            onAmountChange={this.onAmountChange}
                            onDescriptionChange={this.onDescriptionChange}
                            onFormSubmit={this.onWithdrawFormSubmit}
                            customer={this.state.customer}
                            transaction={this.state.transaction}
                            response={this.state.response}
                        />
                    </div>
                )}/>

                <Route path="/transaction/top-up" render={() => (
                    <div className={"container"}>
                        <h2 className={"transaction-title"}>
                            <img src={imageResource.TOP_UP} className={"icon"} alt={"top-up-icon"}/>
                            &nbsp;
                            <span>Top up balance</span>
                        </h2>
                        <Transaction
                            onAmountChange={this.onAmountChange}
                            onDescriptionChange={this.onDescriptionChange}
                            onFormSubmit={this.onTopUpFormSubmit}
                            customer={this.state.customer}
                            transaction={this.state.transaction}
                            response={this.state.response}
                        />
                    </div>
                )}/>
            </div>
        )
    }

    onWithdrawFormSubmit = async (event) => {
        event.preventDefault();
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());

        this.state.transaction.type = Constant.debit();
        //this.setTransactionType(Constant.debit());

        this.submitTransaction(service);
    };

    onTopUpFormSubmit = async (event) => {
        event.preventDefault();
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());

        this.state.transaction.type = Constant.credit();
        //this.setTransactionType(Constant.credit());

        this.submitTransaction(service);
    };

    async submitTransaction(service) {
        try {
            await service.postTransaction(this.state.transaction);

            let response = Object.assign({}, this.state.response);
            response.status = "Transaction successful";
            response.message = "please check your balance";
            response.display = true;

            this.setState({response: response});
        } catch (error) {
            let response = Object.assign({}, this.state.response);
            response.status = "Transaction fail";
            response.message = error.data.toLowerCase();
            response.display = true;

            this.setState({response: response});
        }

        this.setState({transaction: {type: '', amount: '', description: ''}});
        this.refresh();
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

    componentDidMount() {
        this.refresh()
    }

    refresh() {
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        this.getCustomerData(service);
    }

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
