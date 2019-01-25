import { createStore } from 'redux';
import reducer from './reducers/index';
import { loadState, saveState } from './localStorage.js';

const persistedState = loadState();

export const store = createStore(
    reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    saveState(store.getState())
})