import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import queryString from "query-string";

let FilterLink = ({ filter, children, location }) => {
  const currentFilter = queryString.parse(location.search).filter;

  const match = () => {
    if (typeof currentFilter === "undefined") {
      return filter === "all";
    }
    return filter === currentFilter;
  };

  const link = filter === "all" ? "" : `?filter=${filter}`;
  return (
    <NavLink to={link} isActive={match} activeStyle={{ color: "red" }}>
      {children}
    </NavLink>
  );
};
FilterLink = withRouter(connect()(FilterLink));
export default FilterLink;
