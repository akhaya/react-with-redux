import {RECEIVE_ARTISTS, RECEIVE_ARTIST} from '../constants';
import axios from 'axios';

export const receiveArtists = function(artists) {
    return {
        type: RECEIVE_ARTISTS,
        artists: artists
    }
}

export const fetchArtist = function(artistId) {
    return (dispatch, getState) => {
        console.log('in fetchAlbum!!')
        axios.get(`/api/albums/${albumId}`)
        .then(res => res.data)
        .then(album => dispatch(receiveAlbum(album)))
        .catch(console.error.bind(this))
    }
}

export const fetchAlbums = function() {
    return (dispatch, getState) => {
        axios.get('api/albums/')
            .then(res => res.data)
            .then(data => {
                dispatch(receiveAlbums(data))
            })
            .catch(console.error.bind(this))
    }
}

export const receiveAlbum = function(album) {
    return {
        type: RECEIVE_ALBUM,
        selectedAlbum: convertAlbum(album)
    }
}