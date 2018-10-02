import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Transaction.css'
import Formatter from "../Utilities/Formatter";
import Balance from "../Dashboard/Balance";

/*
    This class represent view to deposit or withdraw money
 */

export default class Transaction extends Component {
    render() {
        const {onAmountChange, onDescriptionChange, onFormSubmit, customer, transaction} = this.props;
        return (
            <div>
                <div className={"form-container"}>
                    <Balance sender={customer}/>
                    <form id={"form"} onSubmit={onFormSubmit}>
                        <input
                            id={"amount"}
                            type={"number"}
                            placeholder={"Amount (Min. " + Formatter.currencyFormatter(15000) + ")"}
                            min={15000}
                            required={true}
                            onChange={event => onAmountChange(event.target.value)}
                            value={transaction.amount}
                        />

                        <textarea rows="5" cols="50"
                                  id={"description"}
                                  placeholder={"Description (Optional, max. 15 character)"}
                                  onChange={event => onDescriptionChange(event.target.value)}
                                  value={transaction.description}
                        />

                        <input
                            className={transaction.canSubmit}
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
    transaction: PropTypes.object
};
