import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MessageEditor extends Component {
  onUpdate({content}) {
    this.props.updateMessage({ content });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onUpdate.bind(this))}>
        <input className="form-control"/>
        <button>Cancel</button>
        <button type="submit" className="btn btn-primary btn-block">Save Changes</button>
      </form>
    )
  }
}

export default connect(null, actions) (MessageEditor);
