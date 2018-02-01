import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import { getVisibleTodos, getErrorMessage, getIsFetching } from "../reducers";
import TodoList from "./TodoList";
import FetchError from "./FetchError";
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
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter).then(() => console.log("done")); // here we can show message, or start animation
  }

  render() {
    const {
      isFetching,
      errorMessage,
      toggleTodo,
      removeTodo,
      todos
    } = this.props;

    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    if (errorMessage && !todos.length) {
      return (
        <FetchError message={errorMessage} onRetry={() => this.fetchData()} />
      );
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
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    todos: getVisibleTodos(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;
