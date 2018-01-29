import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleTodo, removeTodo } from "../actions";
import { getVisibleTodos } from "../reducers";
import queryString from "query-string";
import { fetchTodos } from "../api";

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos)
      );
    }
  }
  render() {
    return <TodoList {...this.props} />;
  }
}

// fetchTodos("all").then(todos => console.log(todos));
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

const mapStateToTodoListProps = (state, { location }) => {
  const filter = queryString.parse(location.search).filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, {
    onTodoClick: toggleTodo,
    onRemoveTodoClick: removeTodo
  })(VisibleTodoList)
);

export default VisibleTodoList;
