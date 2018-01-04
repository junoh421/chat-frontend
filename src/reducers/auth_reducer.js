export default function(state = {}, action) {
  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, authenticated: true, currentUser: localStorage.getItem('userId')}
    case 'UNAUTH_USER':
      return { ...state, authenticated: false }
    case 'AUTH_ERROR':
      return { ...state, error: action.payload }
  default:
    return state
  }
}
