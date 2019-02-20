import { Store, createStore, applyMiddleware } from "redux";
import  thunk  from 'redux-thunk';
import reducers from '../reducers/index';
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];
//initalState:
const store: Store<any>= createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;