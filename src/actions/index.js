import * as api from "../api";

export const requestTodos = filter => ({
  type: "REQUEST_TODOS",
  filter
});

const receiveTodos = (filter, response) => ({
  type: "RECEIVE_TODOS",
  filter,
  response
});

export const fetchTodos = filter =>
  api.fetchTodos(filter).then(response => receiveTodos(filter, response));

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
