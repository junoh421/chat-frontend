import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = { term: ''} ;
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.messageReceive = this.messageReceive.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault();
    let userId = this.props.currentUser;
    let content = this.state.term;
    let conversationId = this.props.history.location.pathname.split("/")[2];

    this.props.sendMessage({content, userId, conversationId}, this.props.history);
    this.setState( {term: ''} );
    socket.emit('send:message', conversationId);
  }

  componentDidUpdate() {
    socket.on('receieve:message', this.messageReceive);
  }

  componentWillMount() {
    let conversationId = this.props.history.location.pathname.split("/")[2]
    this.props.fetchMesages({conversationId}, this.props.history);
  }

  messageReceive(conversationId) {
    this.props.fetchMesages({conversationId}, this.props.history);
  }

  renderList() {
    if (!this.props.messages) {
      return <div className="text-center">No messsages for this conversation...</div>
    } else {
      return this.props.messages.map((message) => {
        let date = new Date(message.createdAt);

        return (
          <div className="message-item media" key={message._id}>
            <div className="media-body">
              <h6 className="d-inline font-weight-bold">{message.user.userName}</h6>
              <h6 className="d-inline"> {date.toLocaleDateString()} @ {date.toLocaleTimeString()}</h6>
              <p> {message.content} </p>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div className="container">
        <ul className="message-list mt-5 mb-0 pt-3 pt-2 bg-light border">
          {this.renderList()}
        </ul>
        <form onSubmit={this.onFormSubmit}>
          <div className="input-group">
            <input
             placeholder="Message..."
             className="form-control"
             value={this.state.term}
             onChange={this.onInputChange}
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    messages: state.conversation.messages,
  }
}

export default connect(mapStateToProps, actions) (MessageList);
