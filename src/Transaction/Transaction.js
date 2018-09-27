import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Transaction.css'

/*
    This class represent view to deposit or withdraw money
 */

export default class Transaction extends Component {
    render() {
        const {onAmountChange, onTypeChange, onFormSubmit} = this.props;
        return (
            <form id={"form"} onSubmit={onFormSubmit}>
                <input
                    id={"amount"}
                    type={"number"}
                    min={"1"}
                    placeholder={"Amount of money"}
                    required={true}
                    onChange={event => onAmountChange(event.target.value)}
                />
                <select
                    id={"transaction-type"}
                    onChange={event => onTypeChange(event.target.value)}>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>

                <input
                    id={"submit"}
                    type={"submit"}/>
            </form>
        )
    }
}

Transaction.propTypes = {
    onAmountChange: PropTypes.func,
    onTypeChange: PropTypes.func,
    onFormSubmit: PropTypes.func
};
