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
      <ul className="message-list border border-secondary rounded mr-3 float-right col-md-8">
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
