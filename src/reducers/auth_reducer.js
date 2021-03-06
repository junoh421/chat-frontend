export default function(state = {}, action) {
  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, authenticated: true, currentUser: localStorage.getItem('userId'), userName: localStorage.getItem('userName') }
    case 'UNAUTH_USER':
      return { ...state, authenticated: false }
    case 'AUTH_ERROR':
      return { ...state, error: action.payload }
    case 'AUTH_SUCCESS':
      return { ...state, success: action.payload }
  default:
    return state
  }
}
