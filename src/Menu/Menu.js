import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import DashboardContainer from "../Dashboard/DashboardContainer";
import TransactionContainer from "../Transaction/TransactionContainer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Menu.css';

/*
    This class represent view of clickable route"
 */

export default class Menu extends Component {

    render() {
        return (
            <div>
                <header>
                    <ul>
                        <li>
                            <Link to="/dashboard" className={"link"}><FontAwesomeIcon icon="home"/> Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/transaction" className={"link"}><FontAwesomeIcon icon="money-bill-wave"/> Transaction</Link>
                        </li>
                    </ul>

                    <hr/>
                </header>

                <Route path="/dashboard" render={() => (<DashboardContainer/>)}/>

                <Route path="/transaction" render={() => (<TransactionContainer/>)}/>
            </div>
        );
    }
}



