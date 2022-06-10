import React from "react";
import AddItem from "../add-item/add-item.component";
import DoneItems from "../done-items/done-items.component";
import TodoItems from "../todo-items/todo-items.component";
import classes from "./items.module.scss";

const Items: React.FC = () => {
  return (
    <div className="container-lg mt-5">
      <AddItem />
      <TodoItems />
      <DoneItems />
    </div>
  );
};
export default Items;
