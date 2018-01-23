import todos from "../App.js";
import deepFreeze from "deep-freeze";
import expect from "expect";

it("renders without crashing", () => {
  const stateBefore = [];
  const action = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux"
  };
  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false
    }
  ];
  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEquals(stateAfter);
  console.log("All Passed");
});
