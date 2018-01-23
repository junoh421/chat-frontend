import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ConversationList extends Component {
  componentWillMount() {
    let userId = this.props.currentUser;
    this.props.fetchConversations({userId});
  }

  renderConversationList() {
    return this.props.conversations.map((conversation) => {
      let userNames = conversation.users.map(user => `${user.fullName} (${user.userName})`).join(', ');
      let conversationId = conversation._id;
      return (
        <a className="conversation-link" key={conversationId} href={`/messageboard/${conversationId}`}>
          <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          {userNames}
          <span className="badge badge-primary">{conversation.users.length} users</span>
          </li>
        </a>
      );
    });
  };

  render() {
    if (!this.props.conversations.length) {
      return <h3 className="text-center mt-5">No conversations started ...</h3>
    }

    return (
      <div className="container mt-4">
        <h3 className="text-center mb-3">My Conversations</h3>
        <ul className="list-group mb-5">
          {this.renderConversationList()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    conversations: state.conversations
  };
}

export default connect(mapStateToProps, actions) (ConversationList);
