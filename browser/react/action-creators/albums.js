import {RECEIVE_ALBUMS, RECEIVE_ALBUM} from '../constants';
import {convertAlbums, convertAlbum} from '../utils';
import axios from 'axios';

export const receiveAlbums = function(albums) {
    return {
        type: RECEIVE_ALBUMS,
        albums: convertAlbums(albums)
    }
}

export const fetchAlbum = function(albumId) {
    console.log('albumId in fetchAlbum: ', albumId);
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