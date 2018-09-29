import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Transaction from "./Transaction";
import "./Withdraw.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/*
    This class represent view to deposit or withdraw money
 */

export default class Withdraw extends Component {
    render() {
        const {onAmountChange, onDescriptionChange, onFormSubmit, customer} = this.props;
        return (
            <div className={"withdraw-container"}>
                <h2><FontAwesomeIcon icon={"money-bill-wave"}/> Withdraw money</h2>
                <Transaction
                    onAmountChange={onAmountChange}
                    onDescriptionChange={onDescriptionChange}
                    onFormSubmit={onFormSubmit}
                    customer={customer}
                />
            </div>
        )
    }
}

Transaction.propTypes = {
    onAmountChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onDescriptionChange: PropTypes.func,
};
