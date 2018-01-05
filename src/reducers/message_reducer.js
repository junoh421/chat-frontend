export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_MESSAGES':
      return {...state, messages: action.payload.conversation }
    case 'SELECTED_CONVERSATION':
      return {...state, selectedConversation: action.payload }
  default:
    return state
  }
}
