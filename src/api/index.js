console.log(process.env.COCKPIT_API_KEY);

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

export const fetchTodos = filter =>
  fetch(
    `http://id16900.s24.wh1.su/api/collections/get/todos?token=${
      process.env.COCKPIT_API_KEY
    }`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filter: getFilter(filter)
        // limit: 10,
        // skip: 5,
        // sort: { _created: -1 },
        // populate: 1 // resolve linked collection items
      })
    }
  )
    .then(res => res.json())
    .then(res =>
      res.entries.map(todo => ({
        ...todo,
        id: todo._id
      }))
    );

export const addTodo = text => {
  const newTodo = {
    text,
    completed: false
  };

  return fetch(
    `http://id16900.s24.wh1.su/api/collections/save/todos?token=${
      process.env.COCKPIT_API_KEY
    }`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: newTodo
      })
    }
  )
    .then(res => res.json())
    .then(entry => console.log(entry));
};

export const toggleTodo = todo => {
  // here we should get todo by id, not pass whole todo
  console.log(todo);

  return fetch(
    `http://id16900.s24.wh1.su/api/collections/save/todos?token=${
      process.env.COCKPIT_API_KEY
    }`,
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
    .then(entry => console.log(entry));
};
