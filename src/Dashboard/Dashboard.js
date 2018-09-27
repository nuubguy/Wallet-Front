import React, {Component} from 'react';
import './Dashboard.css'
import Formatter from "../Utilities/Formatter";

/*
    This class represent view of homepage of a customer
 */

export default class Dashboard extends Component {
    render() {
        const {customer} = this.props;
        return (
            <div id="dashboard">
                <h3 id="customer-name">Hello, {customer.name}</h3>
                <h1 id="customer-balance">{Formatter.currencyFormatter(customer.balance)}</h1>
            </div>
        )
    }
}
