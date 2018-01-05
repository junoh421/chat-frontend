import React, { Component } from 'react';
import Header from '../containers/header';
import MessageList from '../containers/message-list';

export default class Messageboard extends Component {

  render() {
    return (
      <div className="Messageboard">
        <Header />
        <MessageList history={this.props.history}/>
      </div>
    );
  }
}
