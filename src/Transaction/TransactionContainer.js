import React, {Component} from "react";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import {Route} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Transaction from "./Transaction";
import './TransactionContainer.css'
import Modal from "react-responsive-modal";

/*
    This class represent logic to serve withdraw and top up page
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
            },
            transactionResponse: {
                openModal: false,
                status: ''
            }
        }
    }

    render() {
        return (
            <div className={"transaction-container"}>
                <Route path="/transaction/withdraw" render={() => (
                    <div className={"container"}>
                        <h2 className={"transaction-title"}>
                            <FontAwesomeIcon icon={"arrow-alt-circle-down"}/>
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
                            <FontAwesomeIcon icon={"arrow-alt-circle-up"}/>
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
                        Please kindly check your wallet balance.
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
        await service.postTransaction(this.state.transaction, this.state.customer);

        try {
            let transactionResponse = Object.assign({}, this.state.transactionResponse);
            transactionResponse.status = 'Transaction success';

            this.setState({transactionResponse});
        } catch (e) {
            let transactionResponse = Object.assign({}, this.state.transactionResponse);
            transactionResponse.status = 'Transaction fail';

            this.setState({transactionResponse});
            console.log("ERRPR");
        }

        this.onOpenModal();
        this.setState({transaction: {transactionType: '', amount: '', description: ''}});
        this.refresh();
    }

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
