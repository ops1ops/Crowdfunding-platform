import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';
import { logger } from 'redux-logger';

// delete devtools and logger

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
);
