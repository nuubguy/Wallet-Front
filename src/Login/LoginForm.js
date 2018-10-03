import React, { Component } from 'react';

export default class Loginform extends Component {
    render() {
        return (
            <div>
                <h3>Login Form</h3>
                <form id="form" onSubmit={this.props.onSubmit}>
                    <input value={this.props.username} onChange={e => this.props.changeUsername(e.target.value)}
                           placeholder="username" type="text"/>
                    <input onChange={e => this.props.changePassword(e.target.value)}
                           type="password" placeholder="password"/>

                    <input type="submit"/>
                </form>
            </div>
        );
    }

}
