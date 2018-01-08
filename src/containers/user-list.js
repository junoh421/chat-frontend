import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUserList() {
    let filteredUsers = this.props.allUsers.filter( user => user._id !== this.props.currentUser)

    return filteredUsers.map((user) => {
      let userId = this.props.currentUser;
      let recipientId = user._id;

      return (
        <a className="list-group-item list-group-item-action"
        onClick={() => this.props.startConversation({userId, recipientId}, this.props.history)}
        key={user._id}>
        {user.fullName} -  {user.userName}
        </a>
      );
    });
  };

  render() {
    if (!this.props.allUsers.length) {
      return <div>Loading users...</div>
    }

    return(
      <div className="containter">
        <h3 className="text-center mb-3">Direct Messages</h3>
        <div className="input-group d-flex flex-row justify-content-center">
          <input type="text" className="form-control col-md-4" placeholder="Find or start a conversation..."/>
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button">Go</button>
          </span>
        </div>
        <br></br>
        <div className="user-container d-flex flex-row justify-content-center">
          <ul className="list-group mb-5 col-md-4">
            {this.renderUserList()}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    allUsers: state.users
  }
}

export default connect(mapStateToProps, actions)(UserList);
