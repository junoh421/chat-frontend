import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/app';
import Messageboard from './components/messageboard';
import Users from './components/users';
import Conversations from './components/conversations';
import SignUp from './containers/auth/signup';
import SignIn from './containers/auth/signin';
import reducers from './reducers';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import RequireAuth from './containers/auth/require_auth';
import './style/index.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if (token) {
  store.dispatch( {type: 'AUTH_USER'} );
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/messageboard/:id' component={RequireAuth(Messageboard)} />
          <Route path='/users' component={RequireAuth(Users)} />
          <Route path='/conversations' component={RequireAuth(Conversations)} />
          <Route path='/' component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);
