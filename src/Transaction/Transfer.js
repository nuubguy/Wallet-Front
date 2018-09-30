import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Transfer.css'
import Formatter from "../Utilities/Formatter";
import imageResource from "../Resource/Resource";

/*
    This class represent view to deposit or withdraw money
 */

export default class Transfer extends Component {
    render() {
        const {onAmountChange, onDescriptionChange, onFormSubmit, customer, transaction, onMyWalletSelect, onPayeeWalletSelect} = this.props;
        return (
            <div>
                <div className={"form-container"}>
                    <h4 className="balance">
                        <img src={imageResource.BALANCE}/> &nbsp;
                        <span>Balance: {Formatter.currencyFormatter(customer.balance.amount) + " " + customer.balance.currency}</span>
                    </h4>
                    <form id={"form"} onSubmit={onFormSubmit}>
                        <select className={"my-wallet"} onChange={event => onMyWalletSelect(event.target.value)}>
                            <option className={"disabled-option"} value="" disabled selected>Select wallet</option>
                            <option value={"C00000001"}>C00000001</option>
                        </select>

                        <select className={"payee-wallet"} onChange={event => onPayeeWalletSelect(event.target.value)}>
                            <option className={"disabled-option"} value="" disabled selected>Select payee</option>
                            <option value={"C00000002"}>C00000002</option>
                        </select>

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
                                  placeholder={"Description (optional)"}
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

Transfer.propTypes = {
    onAmountChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onDescriptionChange: PropTypes.func,
    customer: PropTypes.object,
    transaction: PropTypes.object,
    onMyWalletSelect: PropTypes.func,
    onPayeeWalletSelect: PropTypes.func
};
