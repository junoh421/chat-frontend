import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Messenger extends Component {
  renderField(field) {
    return(
      <div>
        <label>{field.label}</label>
        <input
          className="form-control"
          {...field.input}
          type={field.type}
        />
      </div>
    )
  }

  handleFormSubmit({content}) {
    // this.props.sendMessage({ content }, this.props.history);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form className="form-inline" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="content"
            placeholder="Message here..."
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser }
}

export default reduxForm(
  { form: 'Messenger'
}) (
  connect(mapStateToProps, actions) (Messenger)
);
