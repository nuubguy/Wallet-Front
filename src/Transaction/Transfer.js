import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Transaction.css'
import Balance from "../Dashboard/Balance";
import TransactionResponse from "./TransactionResponse";

/*
    This class represent view to deposit or withdraw money
 */

export default class Transfer extends Component {
    render() {
        const {onAmountChange, onDescriptionChange, onFormSubmit, sender, transaction, onPayeeWalletSelect, response} = this.props;
        console.log(response);
        return (
            <div>
                <div className={"form-container"}>
                    <TransactionResponse response={response}/>
                    <Balance sender={sender}/>
                    <form id={"form"} onSubmit={onFormSubmit}>
                        <select className={"payee-wallet"} defaultValue={''} onChange={event => onPayeeWalletSelect(event.target.value)}>
                            <option value={""} disabled>Select payee</option>
                            <option value={"A00000002"}>A00000002</option>
                            <option value={"A00000003"}>A00000003</option>
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
    sender: PropTypes.object,
    transaction: PropTypes.object,
    onPayeeWalletSelect: PropTypes.func,
    response: PropTypes.object
};
