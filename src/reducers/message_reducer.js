export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_MESSAGES':
      return {...state, messages: action.payload.messages }
    case 'USERS_CONVERSATION':
      return {...state, users: action.payload.users}
  default:
    return state
  }
}
