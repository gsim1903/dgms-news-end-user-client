import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ArticlesApi from '../modules/ArticlesApi'
//import axios from 'axios'

const Location = () => {
  const { userCountry } = useSelector((state) => state)
  //const dispatch = useDispatch()

  useEffect(() => {
    //fetchGeolocation()
    ArticlesApi.getLocation()
  }, [])

  // const fetchUserCoordinates = async () => {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(resolve, reject, {
  //       enableHighAccuracy: true,
  //     })
  //   })
  // }
  

  //const fetchGeolocation = async () => {
  //   const position = await fetchUserCoordinates()

  //   if (position.error) {
  //     dispatch({
  //       type: 'SET_USER_COUNTRY',
  //       payload: 'location cannot be detected',
  //     })

  //   } else {
  
  //     const openCageResponse = await axios.get(
  //       'https://api.opencagedata.com/geocode/v1/json',
  //       {
  //         params: {
  //           key: process.env.REACT_APP_OPENCAGEAPI_KEY,
  //           q: `${position.coords.latitude}+${position.coords.longitude}`,
  //         },
  //       },
  //     )
  //     dispatch({
  //       type: 'SET_USER_COUNTRY',
  //       payload: openCageResponse?.data.results[0].components.country,
  //     })
  //   }
  // }

  return <div data-cy="user-location"> Showing news from {userCountry}</div>
}

export default Location
