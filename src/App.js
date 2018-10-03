import React, {Component} from 'react';
import Menu from "./Menu/Menu";
import {BrowserRouter as Router} from 'react-router-dom';
import Authenticate from "./Api/Authenticate";

class App extends Component {

    render() {
        let auth = new Authenticate("use","","")
        return (
            <Router>
                <Menu/>
            </Router>
        );
    }
}

export default App;
