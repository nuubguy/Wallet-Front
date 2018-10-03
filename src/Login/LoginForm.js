import React, { Component } from 'react';
import './LoginForm.css';

export default class Loginform extends Component {
  render() {
    return (
      <div id={"login-box"}>
        <h3 id={'login-title'}>Login</h3>
        <form id="form" onSubmit={this.props.onSubmit}>
          <input
              id={"username"}
            value={this.props.username}
            onChange={e => this.props.changeUsername(e.target.value)}
            placeholder="username"
            type="text"
          />
          <input
              id={"password"}
            onChange={e => this.props.changePassword(e.target.value)}
            type="password"
            placeholder="password"
          />

          <input type="submit" id={"login-button"}/>
        </form>
      </div>
    );
  }
}
