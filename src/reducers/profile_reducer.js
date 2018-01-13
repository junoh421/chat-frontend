export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_PROFILE':
      return action.payload.user[0];
  default:
    return state
  }
}
