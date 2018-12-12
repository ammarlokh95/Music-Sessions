import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DisplayList extends React.Component {

  listTracks = () => {
    
    console.log(this.props.items);
    const { items } = this.props.items;
    const trackList = [];
    let count = 1;
    items.forEach((item) => {
      const { id } = item.track;
      const songName = item.track.name;
      const albumName = item.track.album.name;
      let artists = '';
      item.track.album.artists.forEach((artist) => {
        if (artists === '') artists = artist.name;
        else artists = `${artists}, ${artist.name}`;
      });
      let duration = item.track.duration_ms;
      duration = millisToMinutesAndSeconds(duration);
      trackList.push(
        <tr key={id}>
          <td>{count}</td>
          <td>{songName}</td>
          <td>{artists}</td>
          <td>{albumName}</td>
          <td>{duration}</td>
        </tr>,
      );
      count += 1;
    });
    return trackList;
  };



  render() {
    return (
      <div className="song-list">
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Song</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Duration</th>
            </tr>
            {this.listTracks()}
          </tbody>
        </table>
      </div>
    );
  }
}

DisplayList.propTypes = {
  items: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  items: state.items,
});

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default connect(mapStateToProps)(DisplayList);
