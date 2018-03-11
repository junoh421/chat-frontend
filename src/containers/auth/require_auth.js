import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socket } from '../../socket'

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      } else {
        let userId = this.props.currentUser;
        socket.emit('user:login', {userId});
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      currentUser: state.auth.currentUser
    };
  }

  return connect(mapStateToProps)(Authentication);
}
