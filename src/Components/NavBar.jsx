import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Location from './Location.jsx'
import { useTranslation } from 'react-i18next'
import LanguageChoice from './LanguageChoices.jsx'



const NavBar = () => {
  const { t, i18n } = useTranslation()
  const { userAuthenticated } = useSelector((state) => state)

  return (
    <Segment >
      <Menu color="black" secondary>
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
        {(!userAuthenticated && (
          <Menu.Item
            data-cy="login-button"
            name="Login"
            as={NavLink}
            to={{ pathname: '/login' }}
          />
        )) || <Menu.Item data-cy="logged-button" name="Logged in" />}
        <LanguageChoice/>
      </Menu>
      <Menu.Item />
      <Location />
    </Segment>
  )
}

export default NavBar
