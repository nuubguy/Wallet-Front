import Transaction from "./Transaction";
import React, {Component} from "react";
import TransactionApiService from "./TransactionApiService";
import TransactionList from "./TransactionList";
import Customer from "../Utilities/Customer";
import TransactionStatus from "./TransactionStatus";
import Message from "../Utilities/Message";

/*
    This class represent logic to serve Transaction, TransactionList, and TransactionStatus class
 */

export default class TransactionContainer extends Component {
    constructor() {
        super();
        this.state = {
            transaction: {
                customer: {
                    id: Customer.id()
                },
                type: Customer.defaultTransactionType(),
                amount: '',
            },
            transactions: [],
            transactionStatus: ''
        }
    }

    render() {
        return (
            <div>
                <TransactionStatus
                    transactionStatus={this.state.transactionStatus}
                />

                <Transaction
                    onAmountChange={this.onAmountChange}
                    onTypeChange={this.onTypeChange}
                    onFormSubmit={this.onFormSubmit}
                />

                <TransactionList transactions={this.state.transactions}/>
            </div>
        )
    }

    onAmountChange = (amount) => {
        let transaction = Object.assign({}, this.state.transaction);
        transaction.amount = amount;
        this.setState({transaction});
    };

    onTypeChange = (type) => {
        let transaction = Object.assign({}, this.state.transaction);
        transaction.type = type;
        this.setState({transaction});
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        TransactionApiService.postTransaction(this.state.transaction, Customer.id())
            .then(() => {
                this.setState({transactionStatus: Message.TransactionSuccess()});
                this.componentDidMount();
            })
            .catch(() => {
                this.setState({transactionStatus: Message.TransactionFail()});
            });
    };

    componentDidMount() {
        TransactionApiService.getLastFiveTransactions(Customer.id())
            .then((response) => {
                this.setNewState(response)
            });
    }

    setNewState(response) {
        this.setState({transactions: response});
    }
}
