import {RECEIVE_ARTISTS, RECEIVE_ARTIST} from '../constants';
import axios from 'axios';
import { convertArtist } from '../utils'

export const receiveArtists = function(artists) {
    return {
        type: RECEIVE_ARTISTS,
        artists: artists
    }
}

export const fetchArtists = function() {
    return (dispatch, getState) => {
        axios.get('api/artists/')
            .then(res => res.data)
            .then(data => {
                dispatch(receiveArtists(data))
            })
            .catch(console.error.bind(this))
    }
}
export const receiveArtist = function(artist) {
    return {
        type: RECEIVE_ARTIST,
        selectedArtist: artist
    }
}
export const fetchArtist = function(artistId) {
    return (dispatch, getState) => {
        Promise
        .all([
            axios.get(`/api/artists/${artistId}`),
            axios.get(`/api/artists/${artistId}/albums`),
            axios.get(`/api/artists/${artistId}/songs`)
        ])
        .then(res => res.map(r => r.data))
        .then(data => {
            let artist = convertArtist(...data)
            dispatch(receiveArtist(artist))
        })
        .catch(console.error.bind(this))
    }
}

