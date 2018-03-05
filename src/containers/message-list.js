import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import $ from 'jquery';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      editMessageId: null,
      content: '',
      messages: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.messageSent = this.messageSent.bind(this);
    this.messageDelete = this.messageDelete.bind(this);
    this.messageUpdate = this.messageUpdate.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
    this.renderMessager = this.renderMessager.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.renderMessageContent = this.renderMessageContent.bind(this);
    this.onMessageContent = this.onMessageContent.bind(this);
    this.onUpdateMessage = this.onUpdateMessage.bind(this);
    this.renderMessageEditor = this.renderMessageEditor.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentWillReceiveProps() {
    socket.on('sent:message', this.messageSent);
    socket.on('deleted:message', this.messageDelete);
    socket.on('updated:message', this.messageUpdate);
  }

  componentWillMount() {
    let conversationId = this.props.history.location.pathname.split("/")[2]
    this.props.fetchMesages({conversationId}, this.props.history);
    // this.props.fetchUsersForConversation({conversationId});
    $( document ).ready(function() {
      $('.message-list').scrollTop($('.message-list')[0].scrollHeight);
    });
  }

  onInputChange(event) {
    this.setState({ term: event.target.value})
  }

  onMessageContent(event) {
    this.setState({ content: event.target.value})
  }

  editMessage({message}) {
    this.setState({ editMessageId: message._id})
  }

  onUpdateMessage(event) {
    event.preventDefault();
    let conversationId = this.props.history.location.pathname.split("/")[2]
    let messageId = this.state.editMessageId;
    let content = this.state.content;

    this.props.updateMessage({messageId, content, conversationId});
    this.setState( {editMessageId: ''} );
  }

  deleteMessage({messageId, conversationId}) {
    this.props.deleteMessage({messageId, conversationId}, this.props.history);
  }

  onFormSubmit(event) {
    event.preventDefault();
    let userId = this.props.currentUser;
    let content = this.state.term;
    let conversationId = this.props.history.location.pathname.split("/")[2];

    this.props.sendMessage({content, userId, conversationId}, this.props.history);
    this.setState( {term: ''} );
  }

  messageSent({message}) {
    this.setState({ messages: [...this.state.messages, message ] });
  }

  messageDelete({messageId}) {
    $(`.message-container-${messageId}`).hide();
  }

  messageUpdate({messageId, content}) {
    $(`.message-container-${messageId}`).find('.message-content').find('.content').html(content + ' (edited)')
  }

  renderMessageEditor(message) {
    return (
      <form className="mb-2 mr-2" onSubmit={this.onUpdateMessage}>
        <input
         defaultValue={message.content}
         onChange={this.onMessageContent}
         className="form-control mb-2"
        />
        <button
          className="btn btn-success mr-1"
          type="submit"
        >
          Save Changes
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => this.setState( {editMessageId: ''} )}
        >
          Cancel
        </button>
      </form>
    )
  }


  renderDropdown(message) {
    let messageId = message._id;
    let conversationId = this.props.history.location.pathname.split("/")[2];
    let userId = message.user._id;

    if (userId === this.props.currentUser) {
      return(
        <div className="message-actions d-inline">
          <button className="btn btn-primary float-lg-right mr-3" data-trigger="hover" type="button" data-toggle="dropdown">
            <span className="text-center">...</span>
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item"
              onClick={() => this.editMessage({message})}>
              Edit
            </button>
            <button className="btn btn-danger dropdown-item"
             onClick={() => this.deleteMessage({messageId, conversationId})}>
            Delete
            </button>
          </div>
        </div>
      )
    }
  }

  renderMessageContent(message) {
    let date = new Date(message.createdAt);

    if (this.state.editMessageId === message._id) {
      return (
        <div className="message-content">
          {this.renderMessageEditor(message)}
        </div>
      )
    } else {
      return(
        <div className="message-content media mb-3">
          <img className="d-inline profile-image mr-2" alt="profile" src={ require('../images/user_icon.jpg') }/>
          <div className="media-body">
            {this.renderDropdown(message)}
            <h5 className="d-inline mt-0">{message.user.fullName}</h5>
            <h6 className="timestamp d-inline"> {date.toLocaleTimeString()} </h6>
            <p className="content"> {message.content} </p>
          </div>
        </div>
      )
    }
  }

  renderList() {
    if (!this.props.messages) {
      return <div className="text-center">Loading...</div>
    } else if (this.props.messages.length === 0 && this.state.messages.length === 0 && this.props.users) {
      let userNames = this.props.users.filter( user => user._id !== this.props.currentUser).map(user => `@${user.userName}`).join(', ');

      return <div className="text-center">This is the very beginning of your direct message history with {userNames}</div>
    } else {
      let allMessages = this.props.messages.concat(this.state.messages);

      return allMessages.map((message) => {
        return (
          <div className={"message-container-" + message._id} key={message._id}>
            <div className="message-item media">
              <div className="media-body">
                {this.renderMessageContent(message)}
              </div>
            </div>
          </div>
        );
      });
    }
  };

  renderMessager() {
    if (this.props.users) {
      let fullNames = this.props.users.filter( user => user._id !== this.props.currentUser).map(user => `@${user.fullName}`).join(', ');
      const placeholder = `Message ${fullNames}`;

      return(
        <form onSubmit={this.onFormSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <button type="submit" className="btn btn-primary">+</button>
            </div>
            <input
             className="form-control"
             value={this.state.term}
             onChange={this.onInputChange}
             placeholder={placeholder}
            />
          </div>
        </form>
      )
    }
  }

  render() {
    return (
      <div className="container">
        <ul className="message-list mt-5 mb-0 pt-3 pt-2 bg-light border">
          {this.renderList()}
        </ul>
        {this.renderMessager()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    messages: state.conversation.messages,
    deletedMessageId: state.conversation.deletedMessageId,
    users: state.conversation.users
  }
}

export default connect(mapStateToProps, actions) (MessageList);
