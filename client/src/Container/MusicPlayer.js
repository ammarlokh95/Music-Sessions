import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SideBar from '../Components/SideBar';
import DisplayList from '../Components/DisplayList';
import SongScroller from '../Components/SongScroller';

class MusicPlayer extends Component {
  toggleMusic = () => {
    const { player } = this.props;
    player.togglePlay().then(() => {
      console.log('Toggled playback!');
    });
  };

  playNext = () => {
    const { player } = this.props;
    player.nextTrack().then(() => {
      console.log('Skipped to next track!');
    });
  };

  playPrev = () => {
    const { player } = this.props;
    player.previousTrack().then(() => {
      console.log('Set to previous track!');
    });
  };

  render() {
    return (
      <div className="music-player">
        <SideBar />
        <DisplayList />
        <SongScroller
          toggleMusic={this.toggleMusic}
          playNext={this.playNext}
          playPrev={this.playPrev}
        />
      </div>
    );
  }
}
MusicPlayer.propType = {
  player: PropTypes.object.isRequired,
};
export default MusicPlayer;
