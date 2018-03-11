import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import $ from 'jquery';
import 'font-awesome/css/font-awesome.min.css';
import { socket } from '../socket'

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipients: [ ],
      users: [ ],
    };

    this.addToConversation = this.addToConversation.bind(this);
    this.renderUserList = this.renderUserList.bind(this);
    this.startConversation = this.startConversation.bind(this);
    this.setOnlineUsers = this.setOnlineUsers.bind(this);
  }

  addToConversation({recipient}) {
    this.setState({ recipients: [...this.state.recipients, recipient] });
    $(`#user-${recipient.id}`).remove();
  }

  setOnlineUsers({users}) {
    let removeDuplicateUsers = users.filter((x, i, a) => a.indexOf(x) === i);

    removeDuplicateUsers.map((userId) => {
      $(`#user-${userId.userId}`).find('.online-status i').css('color', 'green')
    })
  }

  setOfflineUsers({userId}) {
    if (userId) {
      $(`#user-${userId.userId}`).find('.online-status i').css('color', 'grey')
    }
  }

  startConversation(event) {
    event.preventDefault();
    let recipients = [...this.state.recipients.map(recipient => recipient.id), this.props.currentUser]
    this.props.startConversation({recipients}, this.props.history)
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps() {
    socket.on('offline:users', this.setOfflineUsers);
    socket.on('online:users', this.setOnlineUsers);
  }

  renderUserList() {
    let filteredUsers = this.props.allUsers.filter( user => user._id !== this.props.currentUser)

    return filteredUsers.map((user) => {
      let recipient = {}
      recipient["id"] = user._id;
      recipient["fullName"] = user.fullName;

      return (
        <a className="list-group-item list-group-item-action"
          id={"user-" + user._id}
          onClick={() => this.addToConversation({recipient})}
          key={user._id}>
          {user.fullName} - {user.userName}
          <span className="online-status">
            <i className="fa fa-circle"> </i>
          </span>
        </a>
      );
    });
  };

  render() {
    let names = this.state.recipients.map((user) => user.fullName).join(", ")

    if (!this.props.allUsers.length) {
      return <div>Loading users...</div>
    }

    return(
      <div className="containter">
        <h3 className="text-center mb-3">Direct Messages</h3>
          <form className="input-group d-flex flex-row justify-content-center" onSubmit={this.startConversation}>
            <input
             placeholder="Click on users to get started..."
             className="input-group col-md-5"
             value={names}
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-primary">Go</button>
            </span>
          </form>
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
    allUsers: state.users.allUsers,
    onlineUsers: state.users.onlineUsers
  }
}

export default connect(mapStateToProps, actions)(UserList);
