import React, {Component} from 'react';
import Menu from "./Menu/Menu";
import {BrowserRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import {faMoneyBillWave} from '@fortawesome/free-solid-svg-icons'
import {faArrowAltCircleUp} from '@fortawesome/free-solid-svg-icons'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faCreditCard} from '@fortawesome/free-solid-svg-icons'
import {faPiggyBank} from '@fortawesome/free-solid-svg-icons'
import {faArrowAltCircleDown} from '@fortawesome/free-solid-svg-icons'

class App extends Component {
    render() {
        return (
            <Router>
                <Menu/>
            </Router>
        );
    }
}

function initializeFontAwesome() {
    library.add(faHome);
    library.add(faMoneyBillWave);
    library.add(faArrowAltCircleUp);
    library.add(faSignOutAlt);
    library.add(faUser);
    library.add(faCreditCard);
    library.add(faPiggyBank);
    library.add(faArrowAltCircleDown);
}

initializeFontAwesome();


export default App;
