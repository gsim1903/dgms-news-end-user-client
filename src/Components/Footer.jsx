import React from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {
  const { subscriber } = useSelector((state) => state)

  // if (subscriber == 'false') {
  //    const response = 'message one'
  //    toast(response)
  //  }
  // if (subscriber === 'issue') {
  //   const response = 'message two'
  //   toast(response)
  //  } else {
  //    const response = 'message three'
  //    toast(response)
  //  }

  return (
    <footer>
      {subscriber && <p data-cy="message">Thank you for subscribing!</p>}
      <p id="footer">DGMS News - Bringing you the best local news</p>
    </footer>
  )
}

export default Footer
