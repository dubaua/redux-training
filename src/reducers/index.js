import { combineReducers } from "redux";
import todos, * as fromTodos from "./todos";
import visibilityFilter from "./visibilityFilter";

const todoApp = combineReducers({
  todos,
  visibilityFilter
});
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
