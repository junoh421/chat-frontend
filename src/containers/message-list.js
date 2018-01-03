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
        <div className="message-item" key={message._id}>
          <p className="d-inline"> {message.content} - {message.user.userName}</p>
          <p className="d-inline"> {date.toLocaleDateString()} @ {date.toLocaleTimeString()}</p>
        </div>
      );
    });
  };

  render() {
    if (!this.props.messages.length) {
      return <div>No messsages for this conversation...</div>
    }

    return (
      <div className="container d-flex justify-content-center bg-light border mt-5 px-0 col-lg-9">
        <ul className="message-list">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps, actions) (MessageList);
