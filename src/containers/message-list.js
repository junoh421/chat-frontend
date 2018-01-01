import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MessageList extends Component {
  componentWillMount() {
    this.props.fetchMesages();
  }

  renderList() {
    return this.props.messages.map((message) => {
      return (
        <li className="message-item">
          {message.content}
        </li>
      );
    });
  };

  render() {
    if (!this.props.messages.length) {
      return <div>No messsages for this conversation...</div>
    }

    return (
      <ul className="message-list">
        {this.renderList()}
      </ul>
    )
  }
}


function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps, actions) (MessageList);
