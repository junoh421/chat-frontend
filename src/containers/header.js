import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  renderNavItems() {
    if (this.props.authenticated) {
      return(
        [ <li className="nav-item" key={1}>
            <a className="nav-link" href="/conversations">Conversations</a>
          </li>,
          <li className="nav-item" key={2}>
            <a className="nav-link" href="/users">Users</a>
          </li>,
          <li className="nav-item dropdown" key={3}>
            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Profile</a>
            <div className="dropdown-menu">
              <a className="nav-link">Signed in as</a>
              <div className="dropdown-divider"></div>
              <a href="/profile" className="dropdown-item">Your Profile</a>
              <a onClick={() => this.props.signOutUser()} href="/signin" className="dropdown-item">Sign Out</a>
            </div>
          </li>
        ]
      )
    } else {
      return (
        [ <li className="nav-item" key={1}>
            <a className="nav-link" href="/signin">Log In</a>
          </li>,
          <li className="nav-item" key={2}>
            <a className="nav-link" href="/signup">Signup</a>
          </li>,
        ]
      )
    }
  }

  render() {
    return(
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
        <div className="container">
          <a className="navbar-brand" href="/">Chat</a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNavToggle"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarNavToggle">
              <ul className="navbar-nav ml-auto">
                {this.renderNavItems()}
              </ul>
            </div>
          </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  }
}

export default connect(mapStateToProps, actions) (Header)
