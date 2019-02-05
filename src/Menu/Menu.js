import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import DashboardContainer from '../Dashboard/DashboardContainer';
import TransactionContainer from '../Transaction/TransactionContainer';
import './Menu.css';
import imageResource from '../Resource/Resource.js';
import DetailTransactionContainer from '../DetailTransaction/DetailTransactionContainer';
import TransferContainer from '../Transaction/TransferContainer';
import PayeeContainer from '../Transaction/PayeeContainer';

/*
    This class represent view of clickable route"
 */

export default class Menu extends Component {

  static logout() {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    return (
      <div>
        <header>
          <ul>
            <li className="menu">
              <img src={imageResource.HOME} alt="home-icon" className="menu-item" />
              <Link to="/dashboard" className="link"> Home</Link>
            </li>
            <li className="menu">
              <img src={imageResource.TOP_UP} alt="top-up-icon" className="menu-item" />
              <Link to="/transaction/top-up" className="link">Top Up</Link>
            </li>
            <li className="menu">
              <img src={imageResource.TRANSFER} alt="transfer-icon" className="menu-item" />
              <Link to="/transfer" className="link"> Transfer</Link>
            </li>
            <li className="menu">
              <img
                src={imageResource.TRANSACTION_HISTORY}
                alt="transaction-history"
                className="menu-item"
              />
              <Link to="/history" className="link"> Transaction History</Link>
            </li>
            <li className="menu">
              <img src={imageResource.PAYEE} alt="transaction-history" className="menu-item" />
              <Link to="/payee" className="link"> Add Payee</Link>
            </li>
            <li className="menu">
              <img src={imageResource.LOGOUT} alt="transaction-history" className="menu-item" />
              <button onClick={Menu.logout} id={"logout-button"}>Logout</button>
            </li>
          </ul>
        </header>

        <Route path="/dashboard" render={
          () => (<DashboardContainer />)
          } />
        <Route path="/transaction" render={() => (<TransactionContainer />)} />
        <Route path="/transfer" render={() => (<TransferContainer />)} />
        <Route path="/history" render={() => (<DetailTransactionContainer />)} />
        <Route path="/payee" render={() => (<PayeeContainer />)} />
      </div>
    );
  }
}
