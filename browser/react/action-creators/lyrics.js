import {SET_LYRICS} from '../constants';
import axios from 'axios';

export const setLyrics = function (text) {
  return {
    type: SET_LYRICS,
    lyrics: text
  }
}

export const fetchLyrics = function (artist, song) {
  return (dispatch, getState) => {
    axios.get(`/api/lyrics/${artist}/${song}`)
        .then(res => {
          dispatch(setLyrics(res.data.lyric))
        })
        .catch(console.error.bind(console))
  }
}