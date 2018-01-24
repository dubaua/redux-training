const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      // TODO deny empty todos
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    case "REMOVE_TODO":
      const index = state.map(t => t.id).indexOf(action.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

export default todos;

export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case "completed":
      return state.filter(t => t.completed);
    case "active":
      return state.filter(t => !t.completed);
    case "all":
    default:
      return state;
  }
};
