import omit from "lodash/omit";

// lookup table with todos
const byId = (state = {}, action) => {
  // as said Dan Abramov, who cares about cashed array of ids?
  if (action.type === "REMOVE_TODO_SUCCESS" && action.id) {
    return omit(state, action.id);
  }

  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos // here todos corresponds to 'todos' string in actions/schema.js
    };
  }

  return state;
};

export default byId;

// here state corresponds to byId state e.g. lookup table
export const getTodo = (state, id) => state[id];
