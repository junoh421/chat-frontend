import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Header extends Component {
  renderNavItems() {
    if (this.props.authenticated) {
      return(
        [ <li className="nav-item active" key={1}>
            <Link to="/dashboard">
              <button className="btn btn-primary btn-sm">
                Home
              </button>
            </Link>
          </li>,
          <li className="nav-item active" key={2}>
            <Link to="/users">
              <button className="btn btn-success btn-sm">
                Users
              </button>
            </Link>
          </li>,
          <li className="nav-item active" key={3}>
            <Link to="/">
              <button onClick={() => this.props.signOutUser()} className="btn btn-info btn-sm">
                Sign Out
              </button>
            </Link>
          </li>
        ]
      )
    } else {
      return (
        [
          <li className="nav-item active" key={1}>
            <Link to="/signin">
              <button className="btn btn-info btn-sm">
                Log in
              </button>
            </Link>
          </li>,
          <li className="nav-item active" key={2}>
            <Link to="/signup">
              <button className="btn btn-success btn-sm">
                Sign Up
              </button>
            </Link>
          </li>
        ]
      )
    }
  }

  render() {
    return(
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav ml-auto">
          {this.renderNavItems()}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, actions) (Header);
