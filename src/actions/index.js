import * as api from "../api";
import { getIsFetching } from "../reducers/createList";

export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: "FETCH_TODOS_REQUEST",
    filter
  });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: "FETCH_TODOS_SUCCESS",
        filter,
        response
      });
    },
    error => {
      dispatch({
        type: "FETCH_TODOS_FAILURE",
        filter,
        message: error.message || "Something went wrong."
      });
    }
  );
};

// export const addTodo = text =>
//   api.addTodo(text).then(response => ({
//     type: "ADD_TODO",
//     response
//   }));

export const addTodo = text => dispatch =>
  api.addTodo(text).then(response => {
    dispatch({
      type: "ADD_TODO_SUCCESS",
      response
    });
  });

export const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

export const removeTodo = id => ({
  type: "REMOVE_TODO",
  id
});
