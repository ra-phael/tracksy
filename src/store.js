import { createStore } from 'redux';
import reducers from './reducers.js';
import { loadState, saveState } from './localStorage.js';

const persistedState = loadState();

export const store = createStore(
    reducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    saveState(store.getState())
})