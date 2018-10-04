import React, {Component} from 'react';
import DetailTransactionInput from "./DetailTransactionInput.jsx";
import AccountService from "../Api/AccountService";
import Customer from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import TransactionList from "../Dashboard/TransactionList";
import './DetailTransaction.css'
import Notifications, {notify} from 'react-notify-toast';

//TODO create paging for transaction and save description for sorting

export default class DetailTransactionContainer extends Component {
    constructor() {
        super();
        this.state = {
            transactions: [],
            description: '',
            amount: '',
            sort: 0,
            notFoundMessage: '',
            open: false,
        };
    }

    async componentDidMount() {
        const transactions = await this.inputValidation();
        if (transactions.data.length === 0) {
            let color = {background: '#EB4D4B', text: "#FFFFFF"};
            notify.show("Transaction not found", 'custom', 5000, color);
        }
        this.setState({
            transactions: transactions.data
        })
    }


    inputValidation() {
        const service = new AccountService(Customer.id(), Customer.accountId(), Endpoint.baseUrl(), );
        let transactions = service.getAllTransactionList(this.state.sort);
        if (this.state.description !== '' && this.state.amount === '') {
            transactions = service.getTransactionListBasedOnDescription(this.state.description, this.state.sort)
        }
        if (this.state.description === '' && this.state.amount !== '') {
            transactions = service.getTransactionListBasedOnAmount(parseFloat(this.state.amount), this.state.sort)
        }
        if (this.state.description !== '' && this.state.amount !== '') {
            transactions = service.getTransactionListBasedOnAmountAndDescription(parseFloat(this.state.amount), this.state.description,
                this.state.sort)
        }
        return transactions
    }

    render() {
        return (
            <div>
                <Notifications/>

                <section className={"body"}>
                    <DetailTransactionInput
                        amount={this.state.amount}
                        amountOnChange={this.amountOnChange}
                        sort={this.state.sort}
                        description={this.state.description}
                        descriptionOnChange={this.descriptionOnChange}
                        formSubmit={this.formSubmit}
                        imageOnClick={this.imageOnClick}
                        notFoundMessage={this.state.notFoundMessage}
                        onOpenModal={this.onOpenModal}
                        onCloseModal={this.onCloseModal}
                        open={this.state.open}
                    />
                    <TransactionList transactions={this.state.transactions}/>
                </section>
            </div>
        );
    }

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    amountOnChange = (value) => {
        this.setState({
            amount: value
        })
    };

    descriptionOnChange = (value) => {
        this.setState({
            description: value
        })
    };

    formSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.sort);
        this.componentDidMount();
    };

    imageOnClick = () => {

        this.state.sort =(this.state.sort !== 1) ? 1 : 2
        console.log(this.state.sort);
        this.componentDidMount();
    }
}
