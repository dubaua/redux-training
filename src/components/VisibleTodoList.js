import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleTodo, removeTodo } from "../actions";
import { getVisibleTodos } from "../reducers";

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

const mapStateToTodoListProps = (state, { match }) => {
  return {
    todos: getVisibleTodos(state, match.params.filter || "all")
  };
};
const VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, {
    onTodoClick: toggleTodo,
    onRemoveTodoClick: removeTodo
  })(TodoList)
);

export default VisibleTodoList;
