import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import todoApp from "./reducers";
// import throttle from "lodash/throttle";
// import { loadState, saveState } from "./localStorage";
import devToolsEnhancer from "remote-redux-devtools";
import { create } from "domain";

const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return action => {
    console.group(action.type);
    console.log("%c prev state", "color: gray", store.getState());
    console.log("%c action", "color: yellow", action);
    const returnValue = rawDispatch(action);
    console.log("%c next state", "color: green", store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const addPromiseSupportToDispatch = store => {
  const rawDispatch = store.dispatch;
  return action => {
    if (typeof action.then === "function") {
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  };
};

const configureStore = () => {
  // const persistedState = loadState();
  const store = createStore(todoApp, /* persistedState,*/ devToolsEnhancer());

  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch = addPromiseSupportToDispatch(store);

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

export const fakeAPIStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }
  return createStore(
    todoApp,
    applyMiddleware(...middlewares),
    devToolsEnhancer()
  );
};
