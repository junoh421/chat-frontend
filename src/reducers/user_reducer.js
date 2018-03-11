export default function(state = {allUsers: [], onlineUsers: []}, action) {
  switch(action.type) {
    case 'FETCH_USERS':
      return { ...state, allUsers: action.payload.users }
    case 'ONLINE_USERS':
      return state.onlineUsers
    case 'SET_ONLINE_USERS':
      return { ...state, onlineUsers: action.payload }
  default:
    return state
  }
}
