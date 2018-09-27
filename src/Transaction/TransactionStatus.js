import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TransactionStatus.css'

/*
    This class represent the feedback message after doing any transaction
 */

export default class TransactionStatus extends Component {
    render() {
        const {transactionStatus} = this.props;
        return (
            <div id={"outer"}>
                <span>{transactionStatus}</span>
            </div>
        )
    }
}

TransactionStatus.propTypes = {
    transactionStatus: PropTypes.string,
};
