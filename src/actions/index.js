import axios from 'axios';
const ROOT_URL = 'http://localhost:8000/api';

export const signInUser = ({ email, password }, history) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, {email, password})
    .then( response => {
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('userName', response.data.user.userName);
      localStorage.setItem('token', response.data.token);

      dispatch({ type: 'AUTH_USER' });
      history.push('/conversations')
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
      localStorage.setItem('userName', response.data.user.userName);
      localStorage.setItem('token', response.data.token);

      dispatch({ type: 'AUTH_USER' });
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

export const authSuccess = (success) => {
  return {
    type: 'AUTH_SUCCESS',
    payload: success
  }
}

export const usersList = (users) => {
  return {
    type: 'USERS_CONVERSATION',
    payload: users
  }
}


// export const goToDashboard = () => {
//   return function(dispatch) {
//     headers: { authorization: localStorage.getItem('token')}
//     dispatch({ type: 'CURRENT_USER' });
//   }
// }

export const sendMessage = ({ content, userId, conversationId }, history) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/message`, { content, userId, conversationId })
    .then( response => {
      dispatch(fetchMesages({conversationId}, history));
    })
  }
}

export const fetchMesages = ({conversationId, users}, history) => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/conversation/${conversationId}`)
    .then( response => {
      dispatch({ type: 'FETCH_MESSAGES', payload: response.data });
      history.push(`/messageboard/${conversationId}`)
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

export const fetchUser = ({userId}, history) => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/user/${userId}`)
    .then( response => {
      dispatch({ type: 'FETCH_PROFILE', payload: response.data });
    })
  }
}

export const updateUser = ({id, email, password, userName, fullName }, history) => {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/user/${id}`, {email, password, userName, fullName})
    .then( response => {
      localStorage.setItem('userName', response.data.user.userName);
      dispatch({ type: 'AUTH_USER' });
      dispatch(authSuccess(response.data.message));
    })
    .catch( response => {
      dispatch(authError(response.response.data.error))
    })
  }
}

export const fetchConversations = ({userId}) => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/conversations/${userId}`)
    .then( response => {
      dispatch({ type: 'FETCH_CONVERSATIONS', payload: response.data });
    })
  }
}

export const startConversation = ({recipients}, history) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/conversation`, {recipients})
    .then( response => {
      let conversationId = response.data.conversation._id;
      dispatch(fetchMesages({conversationId}, history))
    })
  }
}

export const deleteMessage = ({messageId, conversationId}, history) => {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/message/${messageId}`)
    .then( response => {
      dispatch(fetchMesages({conversationId}, history))
    })
  }
}
