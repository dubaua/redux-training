import * as api from "../api";

const receiveTodos = (filter, response) => ({
  type: "RECEIVE_TODOS",
  filter,
  response
});

export const fetchTodos = filter =>
  api.fetchTodos(filter).then(response => receiveTodos(filter, response));

export const addTodo = text => ({
  type: "ADD_TODO",
  text
});

export const toggleTodo = id =>
  api.toggleTodo(id).then(response => {
    console.log(response);
    return {
      type: "TOGGLE_TODO",
      id
    };
  });

export const removeTodo = id => ({
  type: "REMOVE_TODO",
  id
});
