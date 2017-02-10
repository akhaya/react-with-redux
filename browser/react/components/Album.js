import React from 'react';
import Songs from '../components/Songs';
import {fetchAlbum} from '../action-creators/albums';
import store from '../store';

class Album extends React.Component {

  componentDidMount () {
    const albumId = this.props.routeParams.albumId;

    store.dispatch(fetchAlbum(albumId));
  }

  render () {
    const album = this.props.albums.selectedAlbum;
    const currentSong = this.props.currentSong;
    const isPlaying = this.props.isPlaying;
    const toggleOne = this.props.toggleOne;
    console.log('album: ',this.props.albums)

    return (
      
      <div className="album">
        {album &&
          <div>
              <h3>{ album.name }</h3>
              <img src={ album.imageUrl } className="img-thumbnail" />
          </div>
        }
        {album &&
            <Songs
              songs={album.songs}
              currentSong={currentSong}
              isPlaying={isPlaying}
              toggleOne={toggleOne} />
        }
      </div>
    );
  }
}

export default Album;
