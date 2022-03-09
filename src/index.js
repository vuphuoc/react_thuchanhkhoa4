import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//setup redux
import store from './redux/configStore';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter, Router } from 'react-router-dom/cjs/react-router-dom.min';

import { history } from './util/history';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
