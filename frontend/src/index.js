import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {transitions,positions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import {Provider} from "react-redux";
import store from "./store"

const options={
  timeout:1000,
  positions:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </AlertProvider>
  </Provider>
  
  
);


