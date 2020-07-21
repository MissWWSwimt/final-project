import React from 'react'
import PageWrapper from '../../components/PageWrapper'
import Description from './Description'
import P2 from './P2'
import Recomendation1 from './Recomendation'
import Recomendation2 from './Recomendation2'
import './about.css'

function About() {
  return (
    <PageWrapper>
      <main className="about">
      <h1>Право на чистый воздух важно так же, как и остальные права человека.</h1>
        <Description/>
        <P2/>
        <Recomendation1/>
        <Recomendation2/>
      </main>
    </PageWrapper>

  )
}

export default About
