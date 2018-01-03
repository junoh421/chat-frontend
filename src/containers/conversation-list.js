import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ConversationList extends Component {
  render() {
    return (
      <div className="conversation border border-secondary rounded ml-3 float-left col-lg-3">
        Direct Messages +
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // conversations: state.conversations
  };
}

export default connect(mapStateToProps, actions) (ConversationList);
