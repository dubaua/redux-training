import { createStore } from "redux";
import todoApp from "./reducers";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./localStorage";
import devToolsEnhancer from "remote-redux-devtools";

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState, devToolsEnhancer());

  store.subscribe(
    throttle(() => {
      saveState({
        todos: store.getState().todos
      });
    }, 1000)
  );

  return store;
};

export default configureStore;
