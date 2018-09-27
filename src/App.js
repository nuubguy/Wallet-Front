import React, {Component} from 'react';
import Menu from "./Menu/Menu";
import {BrowserRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import {faMoneyBillWave} from '@fortawesome/free-solid-svg-icons'

library.add(faHome);
library.add(faMoneyBillWave);

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
