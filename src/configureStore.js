import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import todoApp from "./reducers";
// import throttle from "lodash/throttle";
// import { loadState, saveState } from "./localStorage";
import devToolsEnhancer from "remote-redux-devtools";
import { create } from "domain";

const logger = store => next => {
  if (!console.group) {
    return next;
  }

  return action => {
    console.group(action.type);
    console.log("%c prev state", "color: gray", store.getState());
    console.log("%c action", "color: yellow", action);
    const returnValue = next(action);
    console.log("%c next state", "color: green", store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const promise = store => next => action => {
  if (typeof action.then === "function") {
    return action.then(next);
  }
  return next(action);
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares
    .slice()
    .reverse()
    .forEach(middleware => {
      store.dispatch = middleware(store)(store.dispatch);
    });
};

const configureStore = () => {
  // const persistedState = loadState();
  const store = createStore(todoApp, /* persistedState,*/ devToolsEnhancer());
  const middlewares = [promise];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }

  middlewares.push();

  wrapDispatchWithMiddlewares(store, middlewares);

  // store.subscribe(
  //   throttle(() => {
  //     saveState({
  //       todos: store.getState().todos
  //     });
  //   }, 1000)
  // );

  return store;
};

export default configureStore;
