import React from 'react'
import { connect } from 'react-redux'
import { string, func } from 'prop-types'
import { changeName } from '../../store/actions'
import PageTemplate from '../../components/PageTemplate'
import HiddenContentShow from '../../components/HiddenContent'


function ChangeNamePage({ name, change }) {
  return (
    <PageTemplate>
      <div>Your name:</div>
      <input
        value={name}
        type="text"
        onChange={(e) => change(e.target.value)}
      />
      <HiddenContentShow />
    </PageTemplate>
  )
}

ChangeNamePage.propTypes = {
  name: string,
  change: func,
}

const mapStateToProps = (state) => ({
  name: state.name,
})

const mapDispatchToProps = (dispatch) => ({
  change: (name) => dispatch(changeName(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeNamePage)
