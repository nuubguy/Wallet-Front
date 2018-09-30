import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import DashboardContainer from "../Dashboard/DashboardContainer";
import TransactionContainer from "../Transaction/TransactionContainer";
import './Menu.css';
import imageResource from "../Resource/Resource.js";

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
                            <Link to="/dashboard" className={"link"}><img src={imageResource.HOME}/> Home</Link>
                        </li>
                        <li>
                            <Link to="/transaction/withdraw" className={"link"}><img src={imageResource.WITHDRAW}/> Withdraw</Link>
                        </li>
                        <li>
                            <Link to="/transaction/top-up" className={"link"}><img src={imageResource.TOP_UP}/> Top Up</Link>
                        </li>
                        <li>
                            <Link to="/transaction/transfer" className={"link"}><img src={imageResource.TRANSFER}/> Transfer</Link>
                        </li>
                    </ul>

                </header>

                <Route path="/dashboard" render={() => (<DashboardContainer/>)}/>

                <Route path="/transaction" render={() => (<TransactionContainer />)}/>
            </div>
        );
    }
}



