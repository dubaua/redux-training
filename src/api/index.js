const COCKPIT_API_KEY = "d6aa74562570fd7976ea4dee019869";

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
    `http://id16900.s24.wh1.su/api/collections/get/todos?token=${COCKPIT_API_KEY}`,
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

  fetch(
    `http://id16900.s24.wh1.su/api/collections/updateCollection/todos?token=${COCKPIT_API_KEY}`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          fields: [newTodo]
        }
      })
    }
  )
    .then(collection => collection.json())
    .then(collection => console.log(collection));
};
