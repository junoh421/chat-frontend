import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';


class ConversationStarter extends Component {
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

  handleFormSubmit({username}) {
    debugger;
    this.props.startConversatioWithUser({ username }, this.props.history);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="username"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Go</button>
        </form>
      </div>
    );
  }
}

export default reduxForm(
  { form: 'ConversationStarterForm',
  }) (connect(null, actions) (ConversationStarter)
);
