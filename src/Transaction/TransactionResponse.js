import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TransactionResponse.css'

/*
    This class represent view to deposit or withdraw money
 */

export default class TransactionResponse extends Component {
    render() {
        const {response} = this.props;
        console.log(response);
        return (
            <div className={response.display.toString() + ' ' + response.status}>
                <p>{response.status + ", " + response.message + " " + response.withdrawalCode}</p>
            </div>
        )
    }
}

TransactionResponse.propTypes = {
    response: PropTypes.object,
};
