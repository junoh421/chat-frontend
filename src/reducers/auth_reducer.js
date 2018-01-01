export default function(state = {}, action) {
  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, authenticated: true }
    case 'UNAUTH_USER':
      return { ...state, authenticated: false }
    case 'AUTH_ERROR':
      return { ...state, error: action.payload }
    case 'CURRENT_USER':
      return { ...state, currentUser: action.payload}
  default:
    return state
  }
}
