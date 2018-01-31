import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import { getVisibleTodos, getIsFetching } from "../reducers";
import TodoList from "./TodoList";
import queryString from "query-string";

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // check if user navigated
    // or check for todos is modified
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, removeTodo, todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    return (
      <TodoList
        todos={todos}
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
    isFetching: getIsFetching(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;
