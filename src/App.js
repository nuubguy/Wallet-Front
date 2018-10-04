import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginContainer from "./Login/LoginContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <LoginContainer />
      </Router>
    );
  }
}

export default App;
