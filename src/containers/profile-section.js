import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, reduxForm } from 'redux-form';

class ProfileSection extends Component {
  componentWillMount() {
    let userId = this.props.userId;
    this.props.fetchUser({userId});
    // this.props.initialize({email: "junoh421@gmail.com", fullName: "Jun Oh", userName: "junoh421"})
  }

  onSubmit({email, password, userName, fullName}) {
    let id = this.props.userId;
    this.props.updateUser({ id, email, password, userName, fullName }, this.props.history);
  }

  renderMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong> {this.props.errorMessage} </strong>
        </div>
      )
    } else if (this.props.successMessage) {
      return (
        <div className="alert alert-success text-center">
          <strong> {this.props.successMessage} </strong>
        </div>
      )
    }
  }

  renderField(field) {
    const { meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label className="font-weight-bold">{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="card container mt-5 pt-3">
        <h1 className="text-center">Update Profile</h1>
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Email"
              name="email"
              component={this.renderField}
            />
            <Field
              label="Full Name"
              name="fullName"
              component={this.renderField}
            />
            <Field
              label="Username"
              name="userName"
              component={this.renderField}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              component={this.renderField}
            />
            <Field
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              component={this.renderField}
            />
            { this.renderMessage() }
            <button type="submit" className="btn btn-primary btn-block">Update</button>
          </form>
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.email) {
    errors.email = "Enter email";
  }

  if (!values.fullName) {
    errors.fullName = "Enter full name";
  }

  if (!values.userName) {
    errors.userName = "Enter username";
  }

  if (!values.password) {
    errors.password = "Enter password";
  }

  if (values.password !== values.confirmPassword) {
    errors.password = 'Passwords must match'
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.auth.error,
    successMessage: state.auth.success,
    userId: state.auth.currentUser,
  }
}

export default reduxForm(
  { validate,
    form: 'ProfileSection',
  }) (
    connect(mapStateToProps, actions) (ProfileSection)
  );
