import React, { Component } from 'react';
import Header from '../containers/header';
import MessageList from '../containers/message-list';

export default class Dashboard extends Component {

  render() {
    return (
      <div className="Dashboard">
        <Header />
        <MessageList />
      </div>
    );
  }
}
