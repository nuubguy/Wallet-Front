import React, {Component} from 'react';
import './TransactionList.css'
import Formatter from "../Utilities/Formatter";

/*
    This class represent view of last five transaction records
 */

export default class TransactionList extends Component {
    render() {
        const {transactions} = this.props;
        return (
            <table id={"last-five-transactions"}>
                <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    transactions.map(transaction => (
                        <tr key={transaction.dateTime}>
                            <td>{transaction.transactionId}</td>
                            <td>{transaction.transactionType}</td>
                            <td>{Formatter.currencyFormatter(transaction.amount) + " " + transaction.currency}</td>
                            <td>{transaction.description}</td>
                            <td>{Formatter.dateFormatter(transaction.dateTime)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    }
}
