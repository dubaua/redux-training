import React from "react";
import FilterLink from "./FilterLink";

const Footer = props => (
  <div>
    <FilterLink filter="all">All</FilterLink>
    <FilterLink filter="active">Active</FilterLink>
    <FilterLink filter="completed">Completed</FilterLink>
  </div>
);

export default Footer;
