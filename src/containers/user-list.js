import React, { Component } from 'react';

class UserList extends Component {
  render() {
    return(
      <div className="containter">
        <h3 className="text-center">Direct Messages</h3>
        <div className="input-group d-flex flex-row justify-content-center">
          <input type="text" className="form-control col-md-8" placeholder="Find or start a conversation..."/>
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button">Go</button>
          </span>
        </div>
        <br></br>
        <div className="user-container d-flex flex-row justify-content-center">
          <ul class="list-group mb-5 col-md-8">
            <a class="list-group-item list-group-item-action">User One</a>
            <a class="list-group-item list-group-item-action">User Two</a>
            <a class="list-group-item list-group-item-action">User Three</a>
          </ul>
        </div>
      </div>
    )
  }
}

export default UserList;
