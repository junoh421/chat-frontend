export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_MESSAGES':
      return {...state, messages: action.payload.messages }
  default:
    return state
  }
}
