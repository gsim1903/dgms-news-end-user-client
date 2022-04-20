import React from 'react'
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'


const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
  return (
    <>
    <h1>Payment Form</h1>
      <div data-cy="cardnumber">
        <CardNumberElement />
      </div>
      <div data-cy="cc-expiry-date"></div>
      <div data-cy="cc-cvc-number"></div>
      </>
  )
}

export default PaymentForm