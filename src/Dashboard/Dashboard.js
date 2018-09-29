import React, {Component} from 'react';
import './Dashboard.css'
import Formatter from "../Utilities/Formatter";
import TransactionList from "./TransactionList";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

/*
    This class represent view of homepage of a customer
 */

export default class Dashboard extends Component {
    render() {
        const {customer, transactions} = this.props;
        return (
            <div id="dashboard">
                <section id="header">
                    <h1 className="customer-name animation-typewriter"><FontAwesomeIcon icon="user"/> Hello, {customer.name}</h1>
                    <h3 id="customer-balance"><FontAwesomeIcon icon="piggy-bank"/> {Formatter.currencyFormatter(customer.account.amount) + " " + customer.account.currency}</h3>
                </section>

                <section id="transaction-list">
                    <TransactionList transactions={transactions}/>
                </section>
            </div>
        )
    }
}
