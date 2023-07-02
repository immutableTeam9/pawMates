import { createStore, combineReducers } from 'redux';
import modalState from '../modules/modalState';
import user from '../modules/user';
import initialState from '../modules/initialState';
import posts from './../modules/posts';
import tags from '../modules/tags';
import petData from '../modules/petData';

const rootReducer = combineReducers({ modalState, user, initialState, posts, tags, petData });

const store = createStore(rootReducer);

export default store;
