import React, { Component } from 'react';
import Header from '../containers/header';
import UserList from '../containers/user-list';

export default class Users extends Component {
  render() {
    return (
      <div className="UserSearch">
        <Header />
        <UserList />
      </div>
    );
  }
}
