import React, {Component} from 'react';
import Constant from '../Utilities/Constant';
import imageResource from '../Resource/Resource.js';
import './TransactionContainer.css';
import Notifications from 'react-notify-toast';
import Payee from './Payee';
import AccountService from "../Api/AccountService";
import Endpoint from "../Api/Endpoint";
import Message from "../Utilities/Message";


export default class PayeeContainer extends Component {
    constructor() {
        super();
        this.state = {
            payee: {
                accountId: '',
                customerName: '',
            },
            canSubmit: 'cannot-submit'
        };
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Notifications/>
                <div className="container">
                    <h2 className="transaction-title">
                        <img src={imageResource.PAYEE} className="icon" alt="withdraw-icon"/>
                        &nbsp;
                        <span>Add new payee</span>
                    </h2>
                    <Payee
                        onAccountIdChange={this.onAccountIdChange}
                        onAddNewPayee={this.getPayee}
                        canSubmit={this.state.canSubmit}
                        payee={this.state.payee}
                    />
                </div>
            </div>
        );
    }

    onAccountIdChange = (accountId) => {
        let payee = Object.assign({}, this.state.payee);
        payee.accountId = accountId;

        this.state.canSubmit = 'cannot-submit';
        if (accountId.length === 9) {
            this.state.canSubmit = 'can-submit';
        }

        this.setState({payee});
    };

    getPayee = async (event) => {
        event.preventDefault();
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        const accountId = this.state.payee.accountId;
        try {
            const response = await service.getCustomer(accountId);

            let payee = Object.assign({}, this.state.payee);
            payee.accountId = response.data.accountId;
            payee.customerName = response.data.customerName;

            this.setState({payee});
            this.addNewPayee();
        } catch (e) {
            Message.setErrorMessage(Constant.errorAddPayee());
        }
    };

    async addNewPayee() {
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        try {
            await service.putPayee(this.state.payee);
            Message.setSuccessMessage(Constant.successAddPayee());
            this.refresh();
        } catch (e) {
            Message.setErrorMessage(Constant.errorAddPayee());
        }
    }

    refresh() {
        let payee = Object.assign({}, this.state.payee);
        payee.accountId = '';
        payee.customerName = '';

        this.setState({payee: {accountId: '', customerName: ''}});
        this.setState({canSubmit: 'cannot-submit'});
    }

    componentDidMount() {
        this.refresh();
    }
}
