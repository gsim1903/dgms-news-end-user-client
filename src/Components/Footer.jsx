import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const Footer = () => {
  const { subscriber } = useSelector((state) => state);
  return (
    <footer>
      {subscriber && <p data-cy="message">Thank you for subscribing!</p>}
      <p id="footer">DGMS News - Bringing you the best local news</p>
    </footer>
  );
};

export default Footer;
