// lookup table with todos
const byId = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_TODOS":
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    // case "ADD_TODO":
    // case "TOGGLE_TODO":
    //   return {
    //     ...state,
    //     [action.id]: todo(state[action.id], action)
    //   };
    // case "REMOVE_TODO":
    //   return omit(state, [action.id]);
    default:
      return state;
  }
};

export default byId;

// here state corresponds to byId state
export const getTodo = (state, id) => state[id];
