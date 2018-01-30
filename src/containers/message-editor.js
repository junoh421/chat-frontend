import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MessageEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.message,
      conversationId: props.conversationId,
      content: props.message.content,
      history: props.history
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onInputChange(event) {
    this.setState({ content: event.target.value})
  }

  onUpdate() {
    let conversationId = this.state.conversationId;
    let messageId = this.state.message._id;
    let content = this.state.content;

    this.props.updateMessage({messageId, content, conversationId});
    this.setState( {content: ''} );
  }

  render() {
    return (
      <form className="mb-2 mr-2" onSubmit={this.onUpdate}>
        <input
         defaultValue={this.state.message.content}
         onChange={this.onInputChange}
         className="form-control mb-2"
        />
        <button
          className="btn btn-success mr-1"
          type="submit"
        >
        Save Changes
        </button>
        <button className="btn btn-secondary"> Cancel </button>
      </form>
    )
  }
}

export default connect(null, actions) (MessageEditor);
