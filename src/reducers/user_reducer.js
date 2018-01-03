export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_USERS':
      return action.payload.users
  default:
    return state
  }
}
