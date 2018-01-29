import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as action from "../actions";
import { getVisibleTodos } from "../reducers";
import queryString from "query-string";
import { fetchTodos } from "../api";
import TodoList from "./TodoList";

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // check if user navigated
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos => receiveTodos(filter, todos));
  }

  render() {
    const { toggleTodo, removeTodo, ...rest } = this.props;
    return (
      <TodoList
        {...rest}
        onTodoClick={toggleTodo}
        onRemoveTodoClick={removeTodo}
      />
    );
  }
}

const mapStateToTodoListProps = (state, { location }) => {
  const filter = queryString.parse(location.search).filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, action)(VisibleTodoList)
);

export default VisibleTodoList;
