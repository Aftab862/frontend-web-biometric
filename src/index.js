import ReactDOM from 'react-dom';
import React from 'react';
// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// style + assets
import 'assets/scss/style.scss';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import store from 'store';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react'

const domain = 'dev-3yazdzkwmmxseotc.us.auth0.com';
const clientId ="rIN9KRKBRH0kYxxI0LFj39iFlUGZPwIp";
 //'Dlk1iQdCWIVFFMJuArf3ZGGILCxf4VBd'


// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <Provider store={store}>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
        >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Auth0Provider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
