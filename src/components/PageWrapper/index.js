import React from 'react'
import Nav from '../Nav'


function PageWrapper({ children }) {
  return (
    <div className="page-wrapper">
      <Nav />
      {children}
    </div>
  )
}

export default PageWrapper
