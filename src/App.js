import React, {Component} from 'react';
import Menu from "./Menu/Menu";
import {BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <Menu/>
            </Router>
        );
    }
}

export default App;
