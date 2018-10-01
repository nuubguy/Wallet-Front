import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TransactionResponse.css'

/*
    This class represent view to deposit or withdraw money
 */

export default class Transaction extends Component {
    render() {
        const {response} = this.props;
        console.log(response);
        return (
            <div className={response.display.toString() + ' ' + response.status}>
                <p>{response.status + ", " + response.message}</p>
            </div>
        )
    }
}

Transaction.propTypes = {
    response: PropTypes.object,
};
