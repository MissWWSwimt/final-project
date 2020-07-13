
import React, { useEffect } from 'react'
import PageWrapper from '../../components/PageWrapper'
import Map from '../../components/Map'


function Temperature() {
  return (
    <PageWrapper>
      <Map type="temperature" />
    </PageWrapper>
  )
}

export default Temperature
