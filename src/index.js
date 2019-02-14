import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import './styles/index.css';
import App from './App';
import * as serviceWorker from './config/serviceWorker';

const AppRouter = () => (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
