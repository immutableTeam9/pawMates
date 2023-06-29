import { createStore, combineReducers } from 'redux';
import modalState from '../modules/modalState';
import user from '../modules/user';
import initialState from '../modules/initialState';
import posts from './../modules/posts';
import tags from '../modules/tags';

const rootReducer = combineReducers({ modalState, user, initialState, posts, tags });

const store = createStore(rootReducer);

export default store;
