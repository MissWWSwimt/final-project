import React from 'react'
import { connect } from 'react-redux'
import { number, func } from 'prop-types'
import { hiddenContent } from '../../store/actions'

function HiddenContentShow({ showContent, age, change }) {
  return (
    <div>
      <button type="button" onClick={() => change(!showContent)}> {showContent ? 'hide' : 'show'}</button>
      {showContent && age >= 18 ? <div>HiddenContent</div> : null}
    </div>
  )
}

HiddenContentShow.propTypes = {
  age: number,
  change: func,
  showContent: func,
}
const mapStateToProps = (state) => ({
  showContent: state.showContent,
  age: state.age,
})

const mapDispatchToProps = (dispatch) => ({
  change: (showContent) => dispatch(hiddenContent(showContent)),
})


export default connect(mapStateToProps, mapDispatchToProps)(HiddenContentShow)
