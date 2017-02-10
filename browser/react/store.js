import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import lyricsReducer from './reducers/lyrics-reducer';
import playerReducer from './reducers/player-reducer';

const middleware = applyMiddleware(createLogger(), thunkMiddleware);
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export default createStore(combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer
}), composeEnhancers(middleware));
