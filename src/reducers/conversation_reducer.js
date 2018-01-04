export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_CONVERSATIONS':
      return action.payload.conversations
  default:
    return state
  }
}
