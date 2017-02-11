import React, { Component } from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import store from '../store';
import {play, pause, setSong, setList, setProgress} from '../action-creators/player';
import {receiveAlbum, fetchAlbums, fetchAlbum} from '../action-creators/albums';
import {fetchArtists} from '../action-creators/artists';
import { convertAlbum, convertAlbums, convertSong, skip } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = Object.assign(initialState, store.getState());

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.loadSongs = this.loadSongs.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  componentDidMount () {

    Promise
      .all([
        axios.get('/api/playlists')
      ])
      .then(res => res.map(r => r.data))
      .then(data => this.onLoad(...data));

    store.dispatch(fetchAlbums());
    store.dispatch(fetchArtists())

    AUDIO.addEventListener('ended', () =>
      this.next());

    AUDIO.addEventListener('timeupdate', () => {
      store.dispatch(setProgress(AUDIO.currentTime / AUDIO.duration))
    })
    this.unsubscribe = store.subscribe(() => {
        this.setState(store.getState())
    });
  }

  componentWillUnmount (){
    this.unsubscribe();
  }

  onLoad (albums, artists, playlists) {
    this.setState({
      artists: artists,
      playlists: playlists
    });
  }

  play () {
    AUDIO.play();
    store.dispatch(play())
  }

  pause () {
    AUDIO.pause();
    store.dispatch(pause())
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    store.dispatch(setSong(currentSong));
    store.dispatch(setList(currentSongList));
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.player.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.player.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state.player));
  }

  prev () {
    this.startSong(...skip(-1, this.state.player));
  }

  // selectArtist (artistId) {


  //   Promise
  //     .all([
  //       axios.get(`/api/artists/${artistId}`),
  //       axios.get(`/api/artists/${artistId}/albums`),
  //       axios.get(`/api/artists/${artistId}/songs`)
  //     ])
  //     .then(res => res.map(r => r.data))
  //     .then(data => this.onLoadArtist(...data));
  // }

  // onLoadArtist (artist, albums, songs) {
  //   songs = songs.map(convertSong);
  //   albums = convertAlbums(albums);
  //   artist.albums = albums;
  //   artist.songs = songs;

  //   this.setState({ selectedArtist: artist });
  // }

  addPlaylist (playlistName) {
    axios.post('/api/playlists', { name: playlistName })
      .then(res => res.data)
      .then(playlist => {
        this.setState({
          playlists: [...this.state.playlists, playlist]
        }, () => {
          hashHistory.push(`/playlists/${playlist.id}`)
        });
      });
  }

  selectPlaylist (playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        playlist.songs = playlist.songs.map(convertSong);
        this.setState({
          selectedPlaylist: playlist
        });
      });
  }

  loadSongs (songs) {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => {
        this.setState({
          songs: songs
        });
      });
  }

  addSongToPlaylist (playlistId, songId) {
    return axios.post(`/api/playlists/${playlistId}/songs`, {
      id: songId
    })
      .then(res => res.data)
      .then(song => {
        const selectedPlaylist = this.state.selectedPlaylist;
        const songs = this.state.selectedPlaylist.songs;
        const newSongs = [...songs, convertSong(song)];
        const newSelectedPlaylist = Object.assign({}, selectedPlaylist, {
          songs: newSongs
        });

        this.setState({
          selectedPlaylist: newSelectedPlaylist
        });
      });
  }

  render () {

    const props = Object.assign({}, this.state, {
      allAlbums: this.state.albums.albums,
      toggleOne: this.toggleOne,
      toggle: this.toggle,
      addPlaylist: this.addPlaylist,
      selectPlaylist: this.selectPlaylist,
      loadSongs: this.loadSongs,
      addSongToPlaylist: this.addSongToPlaylist
    });

    console.log('this.state: ', this.state)

    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar playlists={this.state.playlists} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children && React.cloneElement(this.props.children, props)
        }
        </div>
        <Player
          currentSong={this.state.player.currentSong}
          currentSongList={this.state.player.currentSongList}
          isPlaying={this.state.player.isPlaying}
          progress={this.state.player.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
