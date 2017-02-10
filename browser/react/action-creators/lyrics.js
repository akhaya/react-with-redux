import {SET_LYRICS} from '../constants'

export const setLyrics = function (text) {
  return {
    type: SET_LYRICS,
    lyrics: text
  }
}
