import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import configureStore from './state/store/configureStore'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import './index.css'

const store = configureStore()
const stripeProvider = loadStripe(`${ process.env.REACT_APP_STRIPE_PK_KEY }`);


window.store = store

ReactDOM.render(
  <Provider store={store}>
    <Elements stripe={stripeProvider}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Elements>
  </Provider>,
  document.getElementById('root'),
)
