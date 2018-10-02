import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Transaction.css'
import Balance from "../Dashboard/Balance";
import Formatter from "../Utilities/Formatter";

/*
    This class represent view to deposit or withdraw money
 */

export default class Transfer extends Component {
    render() {
        const {onAmountChange, onDescriptionChange, onFormSubmit, sender, transaction, onPayeeWalletChange, response} = this.props;
        return (
            <div>
                <div className={"form-container"}>
                    <Balance sender={sender}/>
                    <form>
                        <div id={"payee-wallet-div"} >
                            <input
                                id={"payee-wallet"}
                                onChange={event => onPayeeWalletChange(event.target.value)}
                                placeholder={"Payee account ID"}
                                required={true}
                            />

                            <button id={"check-button"}>Check</button>

                        </div>
                    </form>
                    <form id={"form"} onSubmit={onFormSubmit}>
                        <input
                            id={"amount"}
                            type={"number"}
                            min={"1"}
                            placeholder={"Amount (Min. " + Formatter.currencyFormatter(15000) + ")"}
                            required={true}
                            onChange={event => onAmountChange(event.target.value)}
                            value={transaction.amount}
                            className={transaction.canFillForm}
                        />

                        <textarea rows="5" cols="50"
                                  id={"description"}
                                  placeholder={"Description (Optional, max. 15 character)"}
                                  onChange={event => onDescriptionChange(event.target.value)}
                                  value={transaction.description}
                                  className={transaction.canFillForm}
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

Transfer.propTypes = {
    onAmountChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onDescriptionChange: PropTypes.func,
    sender: PropTypes.object,
    transaction: PropTypes.object,
    onPayeeWalletChange: PropTypes.func,
    response: PropTypes.object
};
