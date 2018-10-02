import React, {Component} from "react";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import imageResource from "../Resource/Resource.js";
import './TransactionContainer.css'
import Transfer from "./Transfer";
import Notification, {notify} from "react-notify-toast";

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
                payeeName: '',
                canSubmit: 'cannot-submit',
                canFillForm: 'cannot-fill-form'
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
                <Notification/>
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
                        onPayeeWalletChange={this.onPayeeWalletChange}
                        response={this.state.response}
                        onCheckPayeeWallet={this.onPayeeWalletChange}
                        onCheckPayeeClick={this.checkPayee}
                    />
                </div>
            </div>
        )
    }

    checkPayee = () => {
        let targetPayee = this.state.transaction.payeeWallet;
        let payees = this.state.sender.payees;
        let transaction = Object.assign({}, this.state.transaction);

        for (let i = 0; i < payees.length; i++) {
            let accountId = payees[i].accountId;

            if (targetPayee === accountId) {
                console.log(payees[i].representation.customerName);
                transaction.canFillForm = 'can-fill-form';
                transaction.payeeName = payees[i].representation.customerName;
                this.setState({transaction});
                return;
            }
            let color = {background: '#EB4D4B', text: "#FFFFFF"};
            notify.show("Payee is not link with your account", 'custom', 3000, color);
        }
    };

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

    onPayeeWalletChange = (wallet) => {
        let transaction = Object.assign({}, this.state.transaction);
        transaction.payeeWallet = wallet;
        transaction.payeeName = '';
        transaction.canFillForm = 'cannot-fill-form';
        transaction.amount = '';
        transaction.description = '';
        transaction.canSubmit = 'cannot-submit';

        this.setState({transaction});
    };

    onCheckPayeeWallet = async (event) => {
        event.preventDefault();
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        try {
            await service.postTransfer(this.state.transaction);

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

        this.setState({transaction: {amount: '', description: '', payeeWallet: '', canSubmit: 'cannot-submit', canFillForm: 'cannot-fill-form'}});
        this.refresh();
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

            let color = {background: '#76daff', text: "#FFFFFF"};
            notify.show(response.status, 'custom', 5000, color);

            this.setState({response: response});
            this.setState({transaction: {amount: '', description: '', payeeWallet: '', payeeName: '', canSubmit: 'cannot-submit'}});
        } catch (error) {
            let response = Object.assign({}, this.state.response);
            response.status = "Oops!";
            response.message = error.data.toLowerCase();
            response.display = true;

            let color = {background: '#EB4D4B', text: "#FFFFFF"};
            notify.show(response.status + ", " + response.message, 'custom', 5000, color);

            this.setState({response: response});
        }

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
