import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Messenger extends Component {
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
    let content = this.state.term
    this.props.sendMessage({content, userId});
    this.setState( {term: ''} );
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="messenger input-group fixed-bottom d-flex justify-content-center">
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
    )
  }
}

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser }
}

export default connect(mapStateToProps, actions)(Messenger);
