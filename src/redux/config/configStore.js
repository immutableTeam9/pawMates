import { createStore } from 'redux';
import { combineReducers } from 'redux';
import posts from './../modules/posts';
import tags from '../modules/tags';

const rootReducer = combineReducers({
  posts: posts,
  tags: tags
});

const store = createStore(rootReducer);

export default store;
