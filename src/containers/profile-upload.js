import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UploadProfile extends Component {
  handleUploadFile(event) {
    const photo = event.target.files[0]
    this.props.uploadPhoto({photo});
  };

  render() {
    return(
      <div className="profile-photo">
        <label className="font-weight-bold">Profile Photo</label>
        <input className="form-group"  accept=".png, .jpg, .jpeg" type="file" onChange={this.handleUploadFile.bind(this)}/>
      </div>
    )
  }
}

export default connect(null, actions) (UploadProfile)
