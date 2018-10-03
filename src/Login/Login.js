import React, { Component } from 'react';
import './Login.css';
import imageResource from '../Resource/Resource.js';

export default class Login extends Component {
  render() {
    return (
      <div id="login-box">
        <div>
          <img src={imageResource.LOGO} id="logo" alt="logo" />
          <form id="form" onSubmit={this.props.onSubmit}>
            <input
              id="username"
              value={this.props.username}
              onChange={e => this.props.onUsernameChange(e.target.value)}
              placeholder="username"
              type="text"
            />
            <input
              id="password"
              onChange={e => this.props.onPasswordChange(e.target.value)}
              type="password"
              placeholder="password"
            />

            <input type="submit" id="login-button" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}
