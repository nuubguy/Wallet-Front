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
            customer: {},
            canSubmit: 'cannot-submit'
        };
    }

    render() {
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

        this.setState({canSubmit : 'cannot-submit'});
        if (accountId.length === 9) {
            this.setState({canSubmit : 'can-submit'});
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

            let payees = this.constructPayees();
            this.addNewPayee(payees);
        } catch (e) {
            Message.setErrorMessage(Constant.errorAddPayee());
        }
    };

    constructPayees() {
        let payees = [];
        for(let i = 0; i < this.state.customer.payees.length; i++) {
            payees.push(this.state.customer.payees[i].representation);
        }

        let payeeAlreadyExist = false;
        for(let i = 0; i < this.state.customer.payees.length; i++) {
            let payeeAccountId = this.state.customer.payees[i].accountId;
            let newPayeeAccountId = this.state.payee.accountId;
            if(payeeAccountId === newPayeeAccountId) {
                payeeAlreadyExist = true;
            }
        }

        if(!payeeAlreadyExist) {
            payees.push(this.state.payee);
        }

        return payees;
    }

    async addNewPayee(payees) {
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        try {
            await service.putPayee(payees);
            Message.setSuccessMessage(Constant.successAddPayee());
            this.refresh();
        } catch (e) {
            Message.setErrorMessage(Constant.errorAddPayee());
        }

        this.componentDidMount();
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
        this.getCustomerData();
    }

    async getCustomerData() {
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        const response = await service.getAccount();
        this.setState({customer: response.data});
    };
}