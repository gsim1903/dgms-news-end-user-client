import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const NavBar = () => {
  const dispatch = useDispatch()
  const { userAuthenticated, userSubscribed } = useSelector((state) => state)

  const handleSubscribe = () => {
    dispatch({ type: 'SET_SUBSCRIBED', payload: true })
    toast = "You've successfully subscribed"
  }

  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item
          data-cy="current-link"
          name="Current news"
          as={Link}
          to={{ pathname: '/' }}
        />
        <Menu.Item
          data-cy="sports-link"
          name="Sports News"
          as={NavLink}
          to={{ pathname: '/sports' }}
        />
        <Menu.Item
          data-cy="business-link"
          name="Business News"
          as={NavLink}
          to={{ pathname: '/business' }}
        />
        {!userAuthenticated ? (
          <Menu.Item
            data-cy="login-button"
            name="Login"
            as={NavLink}
            to={{ pathname: '/login' }}
          />
        ) : (
          <Menu.Item data-cy="logged-button" name="Logged in" />
        )}
        {(!userSubscribed || userAuthenticated ) && (
        <Menu.Item
          data-cy="subscribe-button"
          name="Subscribe"
          onclick={handleSubscribe}
        />)}
      </Menu>
    </Segment>
  )
}

export default NavBar
