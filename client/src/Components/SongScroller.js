import React from 'react';
import {} from 'mdbreact';
import PropTypes from 'prop-types';

// class SongScroller extends React.Component

class SongScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: true,
    };
  }

  togglePlayButton = () => {
    const { isPlay } = this.state;
    const { toggleMusic } = this.props;
    this.setState({
      isPlay: !isPlay,
    });
    toggleMusic();
  };

  render() {
    const { playPrev, playNext } = this.props;
    const { isPlay } = this.state;
    return (
      <div className="song-scroller">
        <div className="song-image">
          <img src="#" alt="Song" />
        </div>
        <div className="player-buttons">
          <button type="button" className="prev" onClick={playPrev}>
            Prev
          </button>
          {isPlay ? (
            <button type="button" className="play-toggle" onClick={this.togglePlayButton}>
              Play
            </button>
          ) : (
            <button type="button" className="play-toggle" onClick={this.togglePlayButton}>
              Pause
            </button>
          )}
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
