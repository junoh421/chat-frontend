import React, { Component } from 'react';
import Header from '../containers/header';
import ConversationStarter from '../containers/conversation_starter';

export default class Dashboard extends Component {

  render() {
    return (
      <div className="Dashboard">
        <Header />
        <ConversationStarter />
      </div>
    );
  }
}
