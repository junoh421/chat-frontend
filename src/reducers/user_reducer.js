export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_USERS':
      return action.payload.users
    case 'ONLINE_USERS':
      return {...state, onlineUsers: action.payload}
  default:
    return state
  }
}
