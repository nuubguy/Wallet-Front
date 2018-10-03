import React, { Component } from 'react';
import './LoginForm.css';
import imageResource from '../Resource/Resource.js';

export default class Loginform extends Component {
  render() {
    return (
      <div id="login-box">
        <div>
          <h2 id="login-title">Welcome back</h2>
            <img src={imageResource.LOGO} id={"logo"} alt={"logo"}/>
          <form id="form" onSubmit={this.props.onSubmit}>
            <input
              id="username"
              value={this.props.username}
              onChange={e => this.props.changeUsername(e.target.value)}
              placeholder="username"
              type="text"
            />
            <input
              id="password"
              onChange={e => this.props.changePassword(e.target.value)}
              type="password"
              placeholder="password"
            />

            <input type="submit" id="login-button" value={"Login"}/>
          </form>
        </div>
      </div>
    );
  }
}
