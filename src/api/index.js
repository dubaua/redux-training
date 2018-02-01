import { COCKPIT_API_KEY } from "./.keys";

const getFilter = filter => {
  switch (filter) {
    case "completed":
      return { completed: true };
    case "active":
      return { completed: false };
    case "all":
    default:
      return null;
  }
};

const fixId = todo => {
  return {
    ...todo,
    id: todo._id
  };
};

export const fetchTodos = filter =>
  fetch(
    `http://id16900.s24.wh1.su/api/collections/get/todos?token=${COCKPIT_API_KEY}`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filter: getFilter(filter)
      })
    }
  )
    .then(res => res.json())
    .then(res => res.entries.map(todo => fixId(todo)));

export const addTodo = text =>
  fetch(
    `http://id16900.s24.wh1.su/api/collections/save/todos?token=${COCKPIT_API_KEY}`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          text,
          completed: false
        }
      })
    }
  )
    .then(res => res.json())
    .then(todo => fixId(todo));

export const toggleTodo = (id, state) => {
  const todo = state.byId[id];
  return fetch(
    `http://id16900.s24.wh1.su/api/collections/save/todos?token=${COCKPIT_API_KEY}`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          ...todo,
          completed: !todo.completed
        }
      })
    }
  )
    .then(res => res.json())
    .then(todo => fixId(todo));
};
