import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import App from './App';
import reducers from './store/reducer';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

  document.getElementById('root') as HTMLElement
);
