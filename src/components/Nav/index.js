import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import './nav.css'

const navItems = [
  { id: 1, link: '/', text: 'Dust' },
  { id: 2, link: '/temperature', text: 'Temperature' },
  { id: 3, link: '/air_humidity', text: 'Air humidity' },
  { id: 4, link: '/subscribe', text: 'Subscribe' },
  { id: 5, link: '/statistics', text: 'Statistics' },
  // { id: 4, link: '/contacts', text: 'Contacts' },

]


function Nav() {
  return (
    <div className="nav scrollmenu">
      <Logo />
      {
            navItems.map((item) => (
              <NavLink
                key={item.id}
                exact
                to={item.link}
                className="navItem"
                activeClassName="active_link"
              >
                {item.text}
              </NavLink>
            ))
        }
    </div>
  )
}

export default Nav
