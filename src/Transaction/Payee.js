import React, { Component } from 'react';
import './Transaction.css';
import PropTypes from 'prop-types';

/*
    This class represent view to deposit or withdraw money
 */

export default class Payee extends Component {
  render() {
    const {
      onAccountIdChange, onAddNewPayee, canSubmit, payee,
    } = this.props;

    return (
      <div>
        <div className="form-container" onSubmit={onAddNewPayee}>
          <form id="form">
            <input
              id="payee-account-id"
              placeholder="Payee's account ID"
              onChange={event => onAccountIdChange(event.target.value)}
              value={payee.accountId}
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
};
