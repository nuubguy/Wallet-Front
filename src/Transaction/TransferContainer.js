import React, {Component} from "react";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import imageResource from "../Resource/Resource.js";
import './TransactionContainer.css'
import Modal from "react-responsive-modal";
import Transfer from "./Transfer";

/*
    This class represent logic to serve withdraw and top up page
 */

export default class TransferContainer extends Component {
    constructor() {
        super();
        this.state = {
            transaction: {
                amount: '',
                description: '',
                payeeWallet: '',
            },
            sender: {
                balance: {
                    amount: '',
                    currency: ''
                }
            },
            response: {
                display: false,
                status: '',
                message: ''
            },
        }
    }

    render() {
        return (
            <div className={"transaction-container"}>
                <div className={"container"}>
                    <h2 className={"transaction-title"}>
                        <img src={imageResource.TRANSFER} className={"icon"} alt={"transfer-icon"}/>
                        &nbsp;
                        <span>Transfer</span>
                    </h2>
                    <Transfer
                        onAmountChange={this.onAmountChange}
                        onDescriptionChange={this.onDescriptionChange}
                        onFormSubmit={this.onSubmitTransfer}
                        sender={this.state.sender}
                        transaction={this.state.transaction}
                        onPayeeWalletSelect={this.onPayeeWalletSelect}
                        response={this.state.response}
                    />
                </div>
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
    };

    onPayeeWalletSelect = (wallet) => {
        let transaction = Object.assign({}, this.state.transaction);
        transaction.payeeWallet = wallet;

        this.setState({transaction});
    };

    onSubmitTransfer = async (event) => {
        event.preventDefault();
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        try {
            await service.postTransfer(this.state.transaction, this.state.transaction.payeeWallet);

            let response = Object.assign({}, this.state.response);
            response.status = "Transfer successful";
            response.message = "please kindly check your balance";
            response.display = true;

            this.setState({response: response});
        } catch (error) {
            let response = Object.assign({}, this.state.response);
            response.status = "Transfer fail";
            response.message = error.data.toLowerCase();
            response.display = true;

            this.setState({response: response});
        }

        this.setState({transaction: {type: '', amount: '', description: ''}});
        this.refresh();
    };

    componentDidMount() {
        this.refresh();
    }

    async refresh() {
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        const response = await service.getAccount();

        this.setState({sender: response.data});
    }
}
