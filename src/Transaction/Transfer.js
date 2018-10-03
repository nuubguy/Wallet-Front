import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Transaction.css';
import Balance from '../Dashboard/Balance';
import Formatter from '../Utilities/Formatter';

/*
    This class represent view to deposit or withdraw money
 */

export default class Transfer extends Component {
  render() {
    const {
      onAmountChange, onDescriptionChange, onFormSubmit, sender, transaction, onPayeeWalletChange, onCheckPayeeClick,
    } = this.props;
    return (
      <div>
        <div className="form-container">
          <Balance sender={sender} />

          <div>
            <div id="payee-wallet-div">
              <input
                id="payee-wallet"
                onChange={event => onPayeeWalletChange(event.target.value)}
                value={transaction.payeeWallet}
                placeholder="Payee account ID"
                required
              />
              <button id="check-button" onClick={() => onCheckPayeeClick()}>Check</button>

            </div>
            <input
              disabled
              id="payee-name"
              value={transaction.payeeName}
              placeholder="Payee name"
            />
          </div>

          <form id="form" onSubmit={onFormSubmit}>
            <input
              id="amount"
              type="number"
              min="1"
              placeholder={`Amount (Min. ${Formatter.currencyFormatter(15000)})`}
              required
              onChange={event => onAmountChange(event.target.value)}
              value={transaction.amount}
              className={transaction.canFillForm}
            />

            <textarea
              rows="5"
              cols="50"
              id="description"
              placeholder="Description (Optional, max. 15 characters)"
              onChange={event => onDescriptionChange(event.target.value)}
              value={transaction.description}
              className={transaction.canFillForm}
            />

            <input
              className={transaction.canSubmit}
              id="submit"
              type="submit"
              value="Transfer"
            />
          </form>
        </div>
      </div>
    );
  }
}

Transfer.propTypes = {
  onAmountChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  sender: PropTypes.object,
  transaction: PropTypes.object,
  onPayeeWalletChange: PropTypes.func,
  response: PropTypes.object,
  onCheckPayeeClick: PropTypes.func,
};
