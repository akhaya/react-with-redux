import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import lyricsReducer from './reducers/lyrics-reducer';
import playerReducer from './reducers/player-reducer';
import albumsReducer from './reducers/albums-reducer';
import artistsReducer from './reducers/artists-reducer';

const middleware = applyMiddleware(createLogger(), thunkMiddleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer,
  albums: albumsReducer,
  artists: artistsReducer
}), composeEnhancers(middleware));
