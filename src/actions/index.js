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
    // headers: { authorization: localStorage.getItem('token')}
    dispatch({ type: 'CURRENT_USER' });
  }
}

export const sendMessage = ({ content, userId }) => {
  let conversationId = '5a4a7c9c91dd88c86c9925a0';
  debugger;
  return function(dispatch) {
    axios.post(`${ROOT_URL}/message`, { content, userId, conversationId })
    .then( response => {
      dispatch(fetchMesages());
    })
  }
}

export const fetchMesages = () => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/conversation/5a4a7c9c91dd88c86c9925a0`)
    .then( response => {
      dispatch({ type: 'FETCH_MESSAGES', payload: response.data });
    })
  }
}

export const fetchUsers = () => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/users`)
    .then( response => {
      dispatch({ type: 'FETCH_USERS', payload: response.data });
    })
  }
}
