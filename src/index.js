import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import redusers from './redusers';
import App from './components/App';

const store = createStore(redusers, applyMiddleware(reduxThunk));
ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>
    ,
    document.querySelector('#root')
);