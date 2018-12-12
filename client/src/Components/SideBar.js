import React from 'react';
import { connect } from 'react-redux';
import { getUsersSongs } from '../Actions/PopulateDisplay';

class SideBar extends React.Component {
  render() {
    const { getUsersSongs } = this.props;
    return (
      <div className="side-bar">
        <div className="search" />
        <div className="button-options">
          <h2>Your Music</h2>
          <button type="button" onClick={() => getUsersSongs()} id="my_songs">
            My Songs
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  { getUsersSongs },
)(SideBar);
