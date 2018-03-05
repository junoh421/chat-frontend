export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_MESSAGES_AND_USERS':
      return {...state, messages: action.payload.messages, users: action.payload.users }
  default:
    return state
  }
}
