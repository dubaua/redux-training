// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import devToolsEnhancer from "remote-redux-devtools";

// todo reducer
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
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

// todos reducer
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

// todo action creators
let nextTodoId = 0;
const addTodo = text => {
  store.dispatch({
    type: "ADD_TODO",
    id: nextTodoId++,
    text
  });
};

const toggleTodo = id => {
  store.dispatch({
    type: "TOGGLE_TODO",
    id
  });
};

const removeTodo = id => {
  store.dispatch({
    type: "REMOVE_TODO",
    id
  });
};

// filter reducer
const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

// filter action creators
const setVisibilityFilter = filter => {
  store.dispatch({
    type: "SET_VISIBILITY_FILTER",
    filter
  });
};

class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id => toggleTodo(id)}
        onRemoveTodoClick={id => removeTodo(id)}
      >
        123
      </TodoList>
    );
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
});
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };

const Button = ({ active, children, onClick }) => (
  <button disabled={active} onClick={() => onClick()}>
    {children}
  </button>
);

class FilterButton extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Button
        active={props.filter === state.visibilityFilter}
        onClick={() => setVisibilityFilter(props.filter)}
      >
        {props.children}
      </Button>
    );
  }
}

const Footer = () => (
  <div>
    <FilterButton filter="SHOW_ALL">All</FilterButton>
    <FilterButton filter="SHOW_ACTIVE">Active</FilterButton>
    <FilterButton filter="SHOW_COMPLETED">Completed</FilterButton>
  </div>
);

const Todo = ({ onClick, onRemoveClick, completed, text }) => (
  <li>
    <span
      onClick={onClick}
      style={{
        textDecoration: completed ? "line-through" : "none"
      }}
    >
      {text}
    </span>{" "}
    <button onClick={onRemoveClick}>&times;</button>
  </li>
);

const TodoList = ({ todos, onTodoClick, onRemoveTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo} // text, completed
        onClick={() => onTodoClick(todo.id)}
        onRemoveClick={() => onRemoveTodoClick(todo.id)}
      />
    ))}
  </ul>
);

const AddTodo = () => {
  let input;

  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          addTodo(input.value);
          input.value = "";
        }}
      >
        Add todo
      </button>
    </div>
  );
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
    case "SHOW_ALL":
    default:
      return todos;
  }
};

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

const store = createStore(todoApp, devToolsEnhancer());
addTodo("Learn Redux");
addTodo("Learn Jest");
addTodo("Learn How To Continious Integration");
addTodo("Learn GraphQL");

ReactDOM.render(<TodoApp />, document.getElementById("root"));
