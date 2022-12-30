import React from "react";
import DoneItems from "../done-items/done-items.component";
import TodoItems from "../todo-items/todo-items.component";

const Items: React.FC = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12 col-lg-6">
          <TodoItems />
        </div>
        <div className="col-12 col-lg-6">
          <DoneItems />
        </div>
      </div>
    </React.Fragment>
  );
};
export default Items;
