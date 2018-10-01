import React, {Component} from "react";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import {Route} from "react-router-dom";
import imageResource from "../Resource/Resource.js";
import Transaction from "./Transaction";
import './TransactionContainer.css'
import Modal from "react-responsive-modal";


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
            },
            transactionResponse: {
                openModal: false,
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
                            <img src={imageResource.WITHDRAW} className={"icon"}/>
                            &nbsp;
                            <span>Withdraw money</span>
                        </h2>
                        < Transaction
                            onAmountChange={this.onAmountChange}
                            onDescriptionChange={this.onDescriptionChange}
                            onFormSubmit={this.onWithdrawFormSubmit}
                            customer={this.state.customer}
                            transaction={this.state.transaction}
                        />
                    </div>
                )}/>

                <Route path="/transaction/top-up" render={() => (
                    <div className={"container"}>
                        <h2 className={"transaction-title"}>
                            <img src={imageResource.TOP_UP} className={"icon"}/>
                            &nbsp;
                            <span>Top up balance</span>
                        </h2>
                        <Transaction
                            onAmountChange={this.onAmountChange}
                            onDescriptionChange={this.onDescriptionChange}
                            onFormSubmit={this.onTopUpFormSubmit}
                            customer={this.state.customer}
                            transaction={this.state.transaction}
                        />
                    </div>
                )}/>

                <Modal open={this.state.transactionResponse.openModal} onClose={this.onCloseModal} center>
                    <h2 className={"modal-head"}>{this.state.transactionResponse.status}</h2>
                    <p>
                        {this.state.transactionResponse.message}
                    </p>
                </Modal>
            </div>
        )
    }

    onWithdrawFormSubmit = async (event) => {
        event.preventDefault();
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());

        this.state.transaction.transactionType = Constant.debit();
        //this.setTransactionType(Constant.debit());

        this.submit(service);

    };

    onTopUpFormSubmit = async (event) => {
        event.preventDefault();
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());

        this.state.transaction.transactionType = Constant.credit();
        //this.setTransactionType(Constant.credit());

        this.submit(service)
    };

    async submit(service) {
        try {
            await service.postTransaction(this.state.transaction, this.state.customer);

            let transactionResponse = Object.assign({}, this.state.transactionResponse);
            transactionResponse.status = "Transaction success";
            transactionResponse.message = "Please kindly check your balance";

            this.setState({transactionResponse});
        } catch (error) {
            let transactionResponse = Object.assign({}, this.state.transactionResponse);
            transactionResponse.status = "Transaction fail";
            transactionResponse.message = error.data;

            this.setState({transactionResponse});
        }

        this.onOpenModal();
        this.setState({transaction: {transactionType: '', amount: '', description: ''}});
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

    onOpenModal = () => {
        let transactionResponse = Object.assign({}, this.state.transactionResponse);
        transactionResponse.openModal = true;

        this.setState({transactionResponse});
    };

    onCloseModal = () => {
        let transactionResponse = Object.assign({}, this.state.transactionResponse);
        transactionResponse.openModal = false;

        this.setState({transactionResponse});
    };
}
