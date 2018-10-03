import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPageContainer from "./Login/LoginPageContainer";

class App extends Component {
  render() {

    return (
      <Router>
        <LoginPageContainer />
      </Router>
    );
  }
}

export default App;
