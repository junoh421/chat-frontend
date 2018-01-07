import React, { Component } from 'react';
import '../style/app.css';
import Header from '../containers/header'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'message ... ',
      term: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.messageReceive = this.messageReceive.bind(this);
    this.messageSend = this.messageSend.bind(this);
  }

  componentDidMount() {
    socket.on('send:message', this.messageReceive);
  }

  messageReceive(message) {
    debugger;
    this.setState( {message : message} );
  }

  messageSend(message) {
    socket.emit('send:message', message);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault();
    socket.emit('send:message', this.state.term);
    this.setState( {message: this.state.term} )
    this.setState( {term: ''} )
  }

  render() {
    return (
       <div className="App">
          <Header />
          <p className="App-intro">
          message: {this.state.message}
          </p>
          <form onSubmit={this.onFormSubmit}>
            <div className="input-group">
              <input
               placeholder="Message..."
               className="input-group"
               value={this.state.term}
               onChange={this.onInputChange}
              />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary">Send</button>
              </span>
            </div>
          </form>
      </div>
    );
  }
}

export default App
