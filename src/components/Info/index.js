import React from 'react'
import { connect } from 'react-redux'
import { string, number } from 'prop-types'
import styles from './info.module.css'

function Info({ name, job, age }) {
  const lines = [
    { id: 1, text: `Your name: ${name}` },
    { id: 2, text: `Your job: ${job}` },
    { id: 3, text: `Your age: ${age}` },
  ]
  return (
    <div className={styles.wrapper}>
      {
        lines.map((line) => (
          <div
            key={line.id}
            className={styles.line}
          >{line.text}
          </div>
        ))
      }
    </div>
  )
}

Info.propTypes = {
  name: string,
  job: string,
  age: number,
}

const mapStateToProps = (state) => ({
  name: state.name,
  job: state.job,
  age: state.age,
})

export default connect(mapStateToProps)(Info)
