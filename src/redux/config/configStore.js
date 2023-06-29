import { createStore, combineReducers } from 'redux';
import modalState from '../modules/modalState';
import user from '../modules/user';
import initialState from '../modules/initialState';

const rootReducer = combineReducers({ modalState, user, initialState });

const store = createStore(rootReducer);

export default store;
