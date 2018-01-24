import React from "react";
import { NavLink } from "react-router-dom";

const FilterLink = ({ filter, children }) => (
  <NavLink exact to={filter} activeStyle={{ color: "red" }}>
    {children}
  </NavLink>
);

export default FilterLink;
