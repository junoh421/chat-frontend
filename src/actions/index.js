import axios from 'axios';
const ROOT_URL = 'http://localhost:8000/api';

export const signInUser = ({ email, password }, history) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, {email, password})
    .then( response => {
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('token', response.data.token);

      dispatch({ type: 'AUTH_USER' });
      dispatch({ type: 'CURRENT_USER' });
      history.push('/dashboard')
    })
    .catch( response => {
      dispatch(authError("Incorrect email or password"))

    })
  }
}

export const signUpUser = ({ email, password, userName, fullName }, history) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password, userName, fullName})
    .then( response => {
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('token', response.data.token);

      dispatch({ type: 'AUTH_USER' });
      dispatch({ type: 'CURRENT_USER' });
      history.push('/dashboard')
    })
    .catch( response => {
      dispatch(authError(response.response.data.error))
    })
  }
}

export const signOutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  return {
    type: 'UNAUTH_USER'
  }

}

export const authError = (error) => {
  return {
    type: 'AUTH_ERROR',
    payload: error
  }
}


export const goToDashboard = () => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/dashboard`, {
      headers: { authorization: localStorage.getItem('token')}
    })
  }
}
