import { combineReducers } from "redux";
import byId, * as fromById from "./byId";
import createList, * as fromList from "./createList";

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

const listByFilter = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed")
});

const todos = combineReducers({
  byId,
  listByFilter
});

export default todos;

// named selector, to get data from state
// this state corresponds to exported state in this file: todos
export const getVisibleTodos = (state, filter) => {
  // here [filter] is a dynamic key
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};
