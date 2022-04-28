import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import configureStore from "./state/store/configureStore";
import './index.css';
import i18n from "./i18n";


const store = configureStore();

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
