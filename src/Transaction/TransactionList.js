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
                    <th>Wallet Id</th>
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    transactions.map(transaction => (
                        <tr key={transaction.date}>
                            <td>{transaction.customer.wallet.id}</td>
                            <td>{transaction.type}</td>
                            <td>{Formatter.currencyFormatter(transaction.nominal)}</td>
                            <td>{Formatter.dateFormatter(transaction.date)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    }
}
