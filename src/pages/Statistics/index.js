import React from 'react'
import { connect } from 'react-redux'
import { string, func } from 'prop-types'
import { changeJob } from '../../store/actions'
import PageTemplate from '../../components/PageTemplate'
import HiddenContent from '../../components/HiddenContent'

function ChangeJob({ job, change }) {
  return (
    <PageTemplate>
      <div>Your job:</div>
      <input
        value={job}
        type="text"
        onChange={(e) => change(e.target.value)}
      />
      <HiddenContent />
    </PageTemplate>
  )
}

ChangeJob.propTypes = {
  job: string,
  change: func,
}

const mapStateToProps = (state) => ({
  job: state.job,
})

const mapDispatchToProps = (dispatch) => ({
  change: (job) => dispatch(changeJob(job)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeJob)
