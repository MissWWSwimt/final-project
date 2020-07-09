import React from 'react'
import { node } from 'prop-types'
import Nav from '../Nav'
import Info from '../Info'

function PageTemplate({ children }) {
  return (
    <div className="page">
      <Nav />
      <Info />
      {children}
    </div>
  )
}

PageTemplate.propTypes = {
  children: node.isRequired,
}

export default PageTemplate
