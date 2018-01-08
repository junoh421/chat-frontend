import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SignIn extends Component {
  renderField(field) {
    const { meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label className="font-weight-bold">{field.label}</label>
        <input
          className="form-control"
          {...field.input}
          type={field.type}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong> {this.props.errorMessage} </strong>
        </div>
      )
    }
  }

  onSubmit({email, password}) {
    this.props.signInUser({ email, password}, this.props.history);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="card container mt-5">
        <div className="card-body">
          <h1 className="text-center">Sign In</h1>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Email"
              name="email"
              type="email"
              component={this.renderField}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              component={this.renderField}
            />
            { this.renderError() }
            <button type="submit" className="btn btn-primary btn-block">Sign in</button>
            <footer className="text-center mt-4">
              <small className="text-muted">
                New to Chat?
              </small>
            </footer>
            <Link to="/signup">
              <button className="btn btn-success btn-block">
                Sign up
              </button>
            </Link>
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

  if (!values.password) {
    errors.password = "Enter password";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}


export default reduxForm(
  {
    validate,
    form: 'SignIn'
  }) (
    connect(mapStateToProps, actions) (SignIn)
  );
