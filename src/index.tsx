import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import './tailwind.css'
import 'antd/dist/antd.css'
import './index.css'
import ContextWrapper from './context/ContextWrapper';

ReactDOM.render(
  <React.StrictMode>
    <ContextWrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </ContextWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
