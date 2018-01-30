import { combineReducers } from "redux";
// import todo from "./todo";
// import omit from "lodash/omit";

// lookup table with todos
const byId = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_TODOS":
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    // case "ADD_TODO":
    // case "TOGGLE_TODO":
    //   return {
    //     ...state,
    //     [action.id]: todo(state[action.id], action)
    //   };
    // case "REMOVE_TODO":
    //   return omit(state, [action.id]);
    default:
      return state;
  }
};

// array of ids
const allIds = (state = [], action) => {
  if (action.filter !== "all") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map(todo => todo.id);
    // TODO: make ADD_TODO and REMOVE_TODO as api requests
    // case "ADD_TODO":
    //   return [...state, action.id];
    // case "REMOVE_TODO":
    //   const index = state.indexOf(action.id);
    //   return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

const activeIds = (state = [], action) => {
  if (action.filter !== "active") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const completedIds = (state = [], action) => {
  if (action.filter !== "completed") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds
});

const todos = combineReducers({
  byId,
  idsByFilter
});

export default todos;

// array of todos as usual
const getAllTodos = state => state.allIds.map(id => state.byId[id]);

// named selector, to get data from state
// this state corresponds to exported state in this file: todos
export const getVisibleTodos = (state, filter) => {
  // here [filter] is a dynamic key
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
};
