import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Transaction.css'
import Formatter from "../Utilities/Formatter";
import imageResource from "../Resource/Resource.js";
import Balance from "../Dashboard/Balance";
import TransactionResponse from "./TransactionResponse";

/*
    This class represent view to deposit or withdraw money
 */

export default class Transaction extends Component {
    render() {
        const {onAmountChange, onDescriptionChange, onFormSubmit, customer, transaction, response} = this.props;
        return (
            <div>
                <div className={"form-container"}>
                    <TransactionResponse response={response}/>
                    <Balance sender={customer}/>
                    <form id={"form"} onSubmit={onFormSubmit}>
                        <input
                            id={"amount"}
                            type={"number"}
                            placeholder={"Amount (Min 15000)"}
                            min={15000}
                            required={true}
                            onChange={event => onAmountChange(event.target.value)}
                            value={transaction.amount}
                        />

                        <textarea rows="5" cols="50"
                                  id={"description"}
                                  placeholder={"Description (Max 15 character)"}
                                  onChange={event => onDescriptionChange(event.target.value)}
                                  value={transaction.description}
                        />

                        <input
                            id={"submit"}
                            type={"submit"}
                            value={"Confirm"}
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
    transaction: PropTypes.object,
    response: PropTypes.object
};
