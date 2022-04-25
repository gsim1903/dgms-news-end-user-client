import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ArticlesAPI from "../modules/ArticlesAPI";


const Location = () => {
const { userCountry } = useSelector((state) => state);

  useEffect(() => {
    ArticlesAPI.getLocation();
  }, []);

  return <div data-cy="user-location"> Showing news from {userCountry}</div>;
};

export default Location;
