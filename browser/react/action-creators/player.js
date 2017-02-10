import {START_PLAYING, STOP_PLAYING, SET_CURRENT_SONG, SET_LIST, SET_PROGRESS} from '../constants';
import axios from 'axios';

export const play = function () {
  return {
    type: START_PLAYING
  }
}
export const pause = function () {
  return {
    type: STOP_PLAYING
  }
}

export const setSong = function (song){
  return{
    type: SET_CURRENT_SONG,
    song: song
  }
}

export const setList = function (list){
  return{
    type: SET_LIST,
    list: list
  }
}

export const setProgress = function(progress){
  return{
    type: SET_PROGRESS,
    progress: progress
  }
}
