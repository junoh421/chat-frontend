import React, { Component } from 'react';
import Header from '../containers/header';
import ProfileSection from '../containers/profile-section';

export default class Profile extends Component {
  render() {
    return (
      <div className="MyProfile">
        <Header />
        <ProfileSection history={this.props.history}/>
      </div>
    );
  }
}
