import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Balance.css';
import Formatter from '../Utilities/Formatter';
import imageResource from '../Resource/Resource';

/*
    This class represent view to deposit or withdraw money
 */

export default class Balance extends Component {
  render() {
    const { sender } = this.props;
    return (
      <h4 className="balance">
        <img src={imageResource.BALANCE} alt="balance-icon" />
        {' '}
        &nbsp;
        <span>{`${Formatter.currencyFormatter(sender.balance.amount)} ${sender.balance.currency}`}</span>
      </h4>

    );
  }
}

Balance.propTypes = {
  sender: PropTypes.object,
};
