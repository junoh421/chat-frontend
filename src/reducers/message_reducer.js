export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_MESSAGES':
      return {...state, messages: action.payload.conversation }
  default:
    return state
  }
}
