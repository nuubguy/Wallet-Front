import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Transaction.css'
import Formatter from "../Utilities/Formatter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/*
    This class represent view to deposit or withdraw money
 */

export default class Transaction extends Component {
    render() {
        const {onAmountChange, onDescriptionChange, onFormSubmit, customer, transaction} = this.props;
        return (
            <div>
                <div className={"form-container"}>
                    <h4 className="balance">
                        <FontAwesomeIcon icon={"piggy-bank"}/> &nbsp;
                        <span>Balance: {Formatter.currencyFormatter(customer.balance.amount) + " " + customer.balance.currency}</span>
                    </h4>
                    <form id={"form"} onSubmit={onFormSubmit}>
                        <input
                            id={"amount"}
                            type={"number"}
                            min={"1"}
                            placeholder={"Amount of money"}
                            required={true}
                            onChange={event => onAmountChange(event.target.value)}
                            value={transaction.amount}
                        />

                        <textarea rows="5" cols="50"
                                  id={"description"}
                                  placeholder={"Description of transaction (optional)"}
                                  onChange={event => onDescriptionChange(event.target.value)}
                                  value={transaction.description}
                        />

                        <input
                            id={"submit"}
                            type={"submit"}
                            value={"Submit"}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

Transaction.propTypes = {
    onAmountChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onDescriptionChange: PropTypes.func,
    customer: PropTypes.object,
    transaction: PropTypes.object
};
