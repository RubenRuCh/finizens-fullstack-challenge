import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

const reducer = combineReducers({

});

export const store = createStore(
    reducer,
    devToolsEnhancer({}),
);
