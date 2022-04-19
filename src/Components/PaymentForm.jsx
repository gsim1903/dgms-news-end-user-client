import React from 'react'
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'


const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
  return (
    <div>PaymentForm
        <div data-cy="cc-number" >
            <CardNumberElement/>
        </div>
        <div data-cy="cc-date" ></div>
        <div data-cy="cc-cvc" ></div>
    </div>
  )
}

export default PaymentForm