import React from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()

  const processPayment = async () => {
    const ccElement = elements.getElement(CardNumberElement)
    let paymentStatus;
    try {
          const stripeResponse = await stripe.createToken(ccElement)
          paymentStatus = await axios.post(
          "http://localhost:3001/api/subscriptions",
          { stripeToken: stripeResponse.token.id, amount: 20000 }
        );
      } catch (error) {
      }
      if (paymentStatus.data.paid) {
        dispatch({ type: "SET_SUBSCRIBER_STATUS", payload: true });
      }
    };


  const options = {
    style: {
      base: {
        fontSize: '20px',
        '::placeholder': {
          color: 'lightgrey',
        },
      },
      invalid: {
        backgroundColor: 'lightgrey',
      },
    },
  }

  const fieldOptions = {
    padding: '10px',
    margin: '10px 10px 10px',
    border: '1px solid lightgrey',
    borderRadius: '3px',
    width: '50%',
  }

  const labelOptions = { margin: '10px 10px 0', fontSize: '18px' }
  return (
    <>
      <h1>PaymentForm</h1>
      <label style={labelOptions}>Credit card number</label>
      <div data-cy="cardnumber" style={fieldOptions}>
        <CardNumberElement options={options} />
      </div>
      <label style={labelOptions}>Expiry date</label>
      <div data-cy="exp-date" style={fieldOptions}>
        <CardExpiryElement options={options} />
      </div>
      <label style={labelOptions}>CVC Number</label>
      <div data-cy="cvc" style={fieldOptions}>
        <CardCvcElement options={options} />
      </div>
      <button data-cy="submit-payment" onClick={processPayment}>
        Submit
      </button>
    </>
  )
}

export default PaymentForm
