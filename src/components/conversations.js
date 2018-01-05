import React, { Component } from 'react';
import Header from '../containers/header';
import ConversationList from '../containers/conversation-list';

export default class Conversations extends Component {
  render() {
    return (
      <div className="ConversationBoard">
        <Header />
        <ConversationList history={this.props.history}/>
      </div>
    );
  }
}
