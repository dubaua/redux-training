import { v4 } from "node-uuid";

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: "hey",
      completed: true
    },
    {
      id: v4(),
      text: "ho",
      completed: true
    },
    {
      id: v4(),
      text: "let's go",
      completed: true
    }
  ]
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(671).then(() => {
    switch (filter) {
      case "completed":
        return fakeDatabase.todos.filter(t => t.completed);
      case "active":
        return fakeDatabase.todos.filter(t => !t.completed);
      case "all":
      default:
        return fakeDatabase.todos;
    }
  });
