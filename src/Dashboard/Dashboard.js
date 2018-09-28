import React, {Component} from 'react';
import './Dashboard.css'
import Formatter from "../Utilities/Formatter";
import TransactionList from "./TransactionList";

/*
    This class represent view of homepage of a customer
 */

export default class Dashboard extends Component {
    render() {
        const {customer, transactions} = this.props;
        return (
            <div id="dashboard">
                <section id="header">
                    <h3 className="customer-name animation-typewriter">Hello, {customer.name}</h3>
                    <h1 id="customer-balance">{Formatter.currencyFormatter(customer.account.amount) + " " + customer.account.currency}</h1>
                </section>

                <section id="transaction-list">
                    <TransactionList transactions={transactions}/>
                </section>
            </div>
        )
    }
}
