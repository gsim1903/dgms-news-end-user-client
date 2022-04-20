import React from 'react'
import { useSelector } from 'react-redux'


const Footer = () => {
  const {subscriber} =useSelector((state) => state)
  return (
      <footer>
        {subscriber && <p data-cy="message"> "Thank your for subscribing"
          </p>}
    <p id="footer">DGMS News - Bringing you the best local news</p>
    </footer>
  )
}

export default Footer