import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class ConversationList extends Component {
  render() {
    return (
      <div className="message-list float-left col-md-3">
        No messsages for this conversation...
        <Link to="/users">
          <button className="btn btn-primary btn-sm">
            Search User
          </button>
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    conversations: state.conversationss
  };
}

export default connect(mapStateToProps, actions) (ConversationList);
