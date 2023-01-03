import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// ===========================|| REDUX - MAIN STORE ||=========================== //

const initialState = {};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
// const persister = 'Demo';

export default store;
