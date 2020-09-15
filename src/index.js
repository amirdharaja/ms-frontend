import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Reducer from './store/reducers/reducer'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'
import './index.css';
import ReactNotification from 'react-notifications-component'

import App from './App'

const store = createStore(Reducer, applyMiddleware(thunk));


const app = (
  <Provider store={store}>
    <div style={{ zIndex: 9999, position: 'relative', top: '60px' }}>
      <ReactNotification />
    </div>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
