import Transaction from "./Transaction";
import React, {Component} from "react";
import TransactionList from "../Dashboard/TransactionList";
import Customer from "../Utilities/Customer";
import TransactionStatus from "./TransactionStatus";

/*
    This class represent logic to serve Transaction, TransactionList, and TransactionStatus class
 */

export default class TransactionContainer extends Component {
    constructor() {
        super();
        this.state = {
            transaction: {
                transactionId: null,
                debit: '',
                credit: '',
                dateTime: null,
                transactionAmount:
                    {
                        amount: '',
                        currency: '',
                    }
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
        transaction.transactionAmount.amount = amount;
        this.setState({transaction});
    };

    onTypeChange = (type) => {
        let transaction = Object.assign({}, this.state.transaction);
        if(type === 'debit') {
            transaction.debit =  {
                accountId: Customer.accountId(),
                customer:
                    {
                        customerId: Customer.id(),
                        name: Customer.name(),
                        info: Customer.info(),
                        disabled: false
                    },
                balance:
                    {
                        amount: '',
                        currency: Customer.currency()
                    }
            }
        } else {
            transaction.credit = {
                accountId: Customer.accountId(),
                customer:
                    {
                        customerId: Customer.id(),
                        name: Customer.name(),
                        info: Customer.info(),
                        disabled: false
                    },
                balance:
                    {
                        amount: '',
                        currency: "IDR"
                    }
            }
        }
        this.setState({transaction});
    };

    onFormSubmit = (event) => {
        // event.preventDefault();
        // console.log(this.state.transactions);
        // TransactionApiService.postTransaction(this.state.transaction)
        //     .then(() => {
        //         this.setState({transactionStatus: Message.TransactionSuccess()});
        //         this.componentDidMount();
        //     })
        //     .catch(() => {
        //         this.setState({transactionStatus: Message.TransactionFail()});
        //     });
    };

    componentDidMount() {
        // TransactionApiService.getLastFiveTransactions(Customer.accountId())
        //     .then((response) => {
        //         this.setState({transactions: response});
        //         console.log(response);
        //     });
    }
}
