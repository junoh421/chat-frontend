import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MessageList extends Component {
  componentWillMount() {
    this.props.fetchMesages();
  }

  renderList() {

    return this.props.messages.map((message) => {
      let date = new Date(message.createdAt);

      return (
        <div className="row message-item" key={message._id}>
          <p> {message.content} - {message.user.userName}</p>
          <p> {date.toLocaleDateString()} @ {date.toLocaleTimeString()}</p>
        </div>
      );
    });
  };

  render() {
    if (!this.props.messages.length) {
      return <div>No messsages for this conversation...</div>
    }

    return (
      <ul className="message-list col-lg-8">
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
