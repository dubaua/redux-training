// import omit from "lodash/omit";

// lookup table with todos
const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos // here todos corresponds to 'todos' string in actions/schema.js
    };
  }
  return state;
};

export default byId;

// here state corresponds to byId state
export const getTodo = (state, id) => state[id];
