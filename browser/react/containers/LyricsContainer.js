import React, { Component } from 'react'
import store from '../store';
import {fetchLyrics} from '../action-creators/lyrics';
import Lyrics from '../components/Lyrics'
import axios from 'axios'


export default class LyricsContainer extends Component {
  constructor(props){
    super(props);
    this.state = Object.assign({
        artistQuery: '',
        songQuery: ''
      }, store.getState())
    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
        this.setState(store.getState())
    });
  }

  componentWillUnmount (){
    this.unsubscribe();
  }

  setArtist(e){
    const value = e.target.value;
    this.setState({artistQuery: value})
  }

  setSong(e){
    const value = e.target.value;
    this.setState({songQuery: value})
  }

  handleSubmit(e){
    e.preventDefault()
    if(this.state.artistQuery && this.state.songQuery){
      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));
    }
  }

  render(){
    return (
      <Lyrics
          text={this.state.lyrics.text}
          setArtist={this.setArtist}
          setSong={this.setSong}
          artistQuery={this.state.artistQuery}
          songQuery={this.state.songQuery}
          handleSubmit={this.handleSubmit}
      />
    )
  }

}

