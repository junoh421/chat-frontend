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
      let users = conversation.users.map(user => `${user.fullName} (${user.userName})`).join(', ')
      let conversationId = conversation._id
      return (
        <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        key={conversation._id}
        onClick={() => this.props.fetchMesages({conversationId}, this.props.history)}>
        {users}
        <span className="badge badge-primary">{conversation.users.length} users</span>
        </li>
      );
    });
  };

  render() {
    if (!this.props.conversations.length) {
      return <div>No conversations started ...</div>
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
