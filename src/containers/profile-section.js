import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ProfileSection extends Component {
  componentWillMount() {
    let userId = this.props.userId;
    this.props.fetchUser({userId});
  }

  render() {
    return (
      <div className="container mt-4">
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.auth.currentUser,
    profile: state.profile
  };
}

export default connect(mapStateToProps, actions) (ProfileSection);
