import React from 'react';
import { Link } from 'react-router';
import { fetchArtist } from '../action-creators/artists';
import store from '../store';

class Artist extends React.Component {

  componentDidMount () {
    const artistId = this.props.routeParams.artistId;

    store.dispatch(fetchArtist(artistId));
  }

  render () {
    const artist = this.props.artists? this.props.artists.selectedArtist : {} //what
    const albums = artist.albums || [];
    const songs = artist.songs || [];
    const children = this.props.children;
    console.log("Re-rendering with", artist, albums, songs)
    return (
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${artist.id}/songs`}>SONGS</Link></li>
        </ul>
        {
          children && React.cloneElement(children, Object.assign({}, this.props, {
            allAlbums: albums,
            songs: songs
          }))
        }
      </div>
    );
  }
}

export default Artist;
