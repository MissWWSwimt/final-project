import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name,
      }
    case 'CHANGE_AGE':
      return {
        ...state,
        age: action.age,
      }
    case 'CHANGE_JOB':
      return {
        ...state,
        job: action.job,
      }
    case 'SHOW_CONTENT':
      return {
        ...state,
        showContent: action.showContent,
      }
    default:
      return state
  }
}

export default reducer
