import React from "react";

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

export default Todo;
