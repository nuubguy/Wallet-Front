import React, { Component } from 'react';
import './Transaction.css';
import PropTypes from 'prop-types';

/*
    This class represent view to deposit or withdraw money
 */

export default class Payee extends Component {
  render() {
    const {
      onAccountIdChange, onAddNewPayee, canSubmit, payee, onCheckClick,
    } = this.props;

    return (
      <div>
        <div className="form-container">
          <form id="form" onSubmit={onAddNewPayee}>
            <div id={"find-payee"}>
              <input
                id="payee-account-id"
                placeholder="Account ID"
                onChange={event => onAccountIdChange(event.target.value)}
                value={payee.accountId}
              />
              <input
                id="find-payee-button"
                type="button"
                value="Check"
                onClick={onCheckClick}
              />
            </div>

            <input
              disabled
              id="payee-name"
              placeholder="Account Name"
              onChange={event => onAccountIdChange(event.target.value)}
              value={payee.customerName}
            />

            <input
              id="submit-payee"
              className={canSubmit}
              type="submit"
              value="Add payee"
            />
          </form>
        </div>
      </div>
    );
  }
}

Payee.propTypes = {
  onAccountIdChange: PropTypes.func,
  onAddNewPayee: PropTypes.func,
  canSubmit: PropTypes.string,
  payee: PropTypes.object,
  onCheckClick: PropTypes.func,
};
