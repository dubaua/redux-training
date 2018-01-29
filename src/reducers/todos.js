import { combineReducers } from "redux";
import todo from "./todo";
import omit from "lodash/omit";

// lookup table with todos
const byId = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TODO":
    case "TOGGLE_TODO":
      return {
        ...state,
        [action.id]: todo(state[action.id], action)
      };
    case "REMOVE_TODO":
      return omit(state, [action.id]);
    default:
      return state;
  }
};

// array of ids
const allIds = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.id];
    case "REMOVE_TODO":
      const index = state.indexOf(action.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allIds
});

export default todos;

// array of todos as usual
const getAllTodos = state => state.allIds.map(id => state.byId[id]);

// named selector, to get data from state
// this state corresponds to exported state in this file: todos
export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case "completed":
      return allTodos.filter(t => t.completed);
    case "active":
      return allTodos.filter(t => !t.completed);
    case "all":
    default:
      return allTodos;
  }
};
