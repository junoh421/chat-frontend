import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = { term: ''} ;
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault();
    let userId = this.props.currentUser;
    let content = this.state.term;
    let conversationId = this.props.conversationId;

    this.props.sendMessage({content, userId, conversationId});
    this.setState( {term: ''} );
  }

  // componentWillMount() {
  //   this.props.fetchMesages();
  // }

  renderList() {
    if (!this.props.messages) {
      return <div>No messsages for this conversation...</div>
    } else {
      return this.props.messages.map((message) => {
        let date = new Date(message.createdAt);

        return (
          <div className="message-item" key={message._id}>
            <p className="d-inline"> {message.content} - {message.user.userName}</p>
            <p className="d-inline"> {date.toLocaleDateString()} @ {date.toLocaleTimeString()}</p>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <ul className="message-list">
          {this.renderList()}
        </ul>
        <form onSubmit={this.onFormSubmit}>
          <input
           placeholder="Message..."
           className="form-control col-lg-8"
           value={this.state.term}
           onChange={this.onInputChange}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">Send</button>
          </span>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    messages: state.conversation.messages,
    conversationId: state.conversation.selectedConversation
  }
}


export default connect(mapStateToProps, actions) (MessageList);
