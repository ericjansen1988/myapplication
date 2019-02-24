import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

//import {Router, Route} from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Routes from './components/Routes';

//import './bootstrap431.css';
//import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

ReactDOM.render(
    
	<BrowserRouter>
        <Routes />
    </BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();