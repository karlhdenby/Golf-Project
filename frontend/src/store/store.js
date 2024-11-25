import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import sessionReducer from './session';
import {thunk} from 'redux-thunk'
import ratesReducer from './rates';
import teetimesReducer from './teetimes';

const rootReducer = combineReducers({
  session: sessionReducer,
  rates: ratesReducer,
  teetimes: teetimesReducer
});

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;