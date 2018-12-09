import React from 'react';
import {} from 'mdbreact';
import PropTypes from 'prop-types';

// class SongScroller extends React.Component

class SongScroller extends React.Component {
  play;

  render() {
    const { playPrev, playNext, toggleMusic } = this.props;
    return (
      <div className="song-scroller">
        <div className="song-image">
          <img src="#" alt="Song" />
        </div>
        <div className="player-buttons">
          <button type="button" className="prev" onClick={playPrev}>
            Prev
          </button>
          <button type="button" className="play-toggle" onClick={toggleMusic}>
            Play
          </button>
          <button type="button" className="next" onClick={playNext}>
            Next
          </button>
        </div>
        <div className="scroller" />
      </div>
    );
  }
}

SongScroller.propTypes = {
  toggleMusic: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired,
  playPrev: PropTypes.func.isRequired,
};

export default SongScroller;
