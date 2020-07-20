import React from 'react'
import { NavLink } from 'react-router-dom'
// import Logo from './Logo'
import './nav.css'

const navItems = [
  { id: 1, link: '/about_us', text: 'ToBreathe' },
  { id: 2, link: '/', text: 'PM2.5' },
  { id: 3, link: '/temperature', text: 'Temperature' },
  { id: 4, link: '/air_humidity', text: 'Air humidity' },
  { id: 5, link: '/subscribe', text: 'Subscribe' },
  { id: 6, link: '/statistics', text: 'Statistics' },


]


function Nav() {
  return (
    <nav className="nav scrollmenu">
      {/* <Logo /> */}
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
    </nav>
  )
}

export default Nav
