import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_DATA':
      return {
        ...state,
        data: action.globalData,
      }
    default:
      return state
  }
}

export default reducer
