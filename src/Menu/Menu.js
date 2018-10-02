import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import DashboardContainer from "../Dashboard/DashboardContainer";
import TransactionContainer from "../Transaction/TransactionContainer";
import './Menu.css';
import imageResource from "../Resource/Resource.js";
import DetailTransactionContainer from "../DetailTransaction/DetailTransactionContainer";

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
                            <Link to="/dashboard" className={"link"}><img src={imageResource.HOME} alt={"home-icon"}/> Home</Link>
                        </li>
                        <li>
                            <Link to="/transaction/withdraw" className={"link"}><img src={imageResource.WITHDRAW} alt={"withdraw-icon"}/> Withdraw</Link>
                        </li>
                        <li>
                            <Link to="/transaction/top-up" className={"link"}><img src={imageResource.TOP_UP} alt={"top-up-icon"}/> Top Up</Link>
                        </li>
                        <li>
                            <Link to="/transfer" className={"link"}><img src={imageResource.TRANSFER} alt={"transfer-icon"}/> Transfer</Link>
                        </li>
                    </ul>

                </header>

                <Route path="/dashboard" render={() => (<DashboardContainer/>)}/>
                <Route path="/detail" render={() => (<DetailTransactionContainer/>)}/>
                <Route path="/transaction" render={() => (<TransactionContainer />)}/>

                <Route path="/transfer" render={() => (<TransferContainer />)}/>
            </div>
        );
    }
}



