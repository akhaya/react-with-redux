import React from 'react';
import axios from 'axios';
import AddSong from '../components/AddSong';

class AddSongContainer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      songId: 1,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.props.loadSongs();
  }

  handleChange (evt) {
    this.setState({
      songId: evt.target.value,
      error: false
    });
  }

  handleSubmit (evt) {
    evt.preventDefault();

    const playlistId = this.props.selectedPlaylist.id;
    const songId = this.state.songId;

    this.props.addSongToPlaylist(playlistId, songId)
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render () {

    const songs = this.props.songs;
    const error = this.state.error;

    return (
      <AddSong
        {...this.props}
        songs={songs}
        error={error}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit} />
    );
  }
}

export default AddSongContainer;
