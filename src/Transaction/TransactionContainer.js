import React, {Component} from "react";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import imageResource from "../Resource/Resource.js";
import Transaction from "./Transaction";
import './TransactionContainer.css'
import Notifications, {notify} from 'react-notify-toast';
import {Route} from "react-router-dom";


export default class TransactionContainer extends Component {
    constructor() {
        super();
        this.state = {
            transaction: {
                type: '',
                amount: '',
                description: '',
                canSubmit: 'cannot-submit'
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
                message: '',
                withdrawalCode: ''
            },
            redirect: false
        }
    }

    render() {
        return (
            <div>
                <Notifications/>
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
            </div>
        )
    }

    componentWillReceiveProps() {
        let transaction = Object.assign({}, this.state.transaction);
        transaction.type = '';
        transaction.amount = '';
        transaction.description = '';
        transaction.canSubmit = 'cannot-submit';

        this.setState({transaction});
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
            const apiResponse = await service.postTransaction(this.state.transaction);

            let response = Object.assign({}, this.state.response);
            response.status = "Transaction successful";
            response.message = "";
            response.display = true;
            response.withdrawalCode = apiResponse.data.withdrawalCode;

            if(this.state.transaction.type === Constant.debit()) {
                response.status = "Your withdrawal code is " + response.withdrawalCode;
            }

            let color = { background: '#76daff', text: "#FFFFFF" };
            notify.show(response.status, 'custom', 5000, color);

            this.setState({transaction: {type: '', amount: '', description: '', canSubmit: 'cannot-submit'}});
            this.setState({response: response});
            this.setState({redirect: true});
        } catch (error) {
            let response = Object.assign({}, this.state.response);
            response.status = "Oops!";
            response.message = error.data.toLowerCase();
            response.display = true;
            response.withdrawalCode = '';

            let color = { background: '#EB4D4B', text: "#FFFFFF" };
            notify.show(response.status + ", " + response.message, 'custom', 5000, color);

            this.setState({response: response});
        }

        this.refresh();
    }

    onAmountChange = (amount) => {
        let transaction = Object.assign({}, this.state.transaction);
        transaction.amount = amount;

        transaction.canSubmit = 'cannot-submit';
        if (amount >= Constant.minimumTransaction() && amount <= Constant.maximumTransaction()) {
            transaction.canSubmit = 'can-submit';
        }

        this.setState({transaction});
    };

    onDescriptionChange = (description) => {
        let transaction = Object.assign({}, this.state.transaction);
        transaction.description = description;

        this.setState({transaction});
    };

    componentDidMount() {
        this.refresh();
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
