import React, { Component } from 'react';
import Header from '../containers/header';
import Messenger from '../containers/messenger';

export default class Dashboard extends Component {

  render() {
    return (
      <div className="Dashboard">
        <Header />
        <Messenger />
      </div>
    );
  }
}
