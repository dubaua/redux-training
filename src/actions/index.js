import * as api from "../api";

const requestTodos = filter => ({
  type: "REQUEST_TODOS",
  filter
});

const receiveTodos = (filter, response) => ({
  type: "RECEIVE_TODOS",
  filter,
  response
});

export const fetchTodos = filter => dispatch => {
  dispatch(requestTodos(filter));
  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  });
};

// export const addTodo = text =>
//   api.addTodo(text).then(response => ({
//     type: "ADD_TODO",
//     response
//   }));

export const addTodo = text => ({
  type: "ADD_TODO",
  text
});

export const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

export const removeTodo = id => ({
  type: "REMOVE_TODO",
  id
});
