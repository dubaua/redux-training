// import omit from "lodash/omit";

// lookup table with todos
const byId = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_TODOS_SUCCESS":
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    case "ADD_TODO_SUCCESS":
      return {
        ...state,
        [action.response._id]: action.response
      };
    // case "REMOVE_TODO":
    //   return omit(state, action.id);
    default:
      return state;
  }
};

export default byId;

// here state corresponds to byId state
export const getTodo = (state, id) => state[id];
