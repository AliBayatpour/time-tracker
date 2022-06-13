import React, { useContext, useEffect } from "react";
import ItemContext from "../../../store/item-context";
import AddItem from "../add-item/add-item.component";
import DoneItems from "../done-items/done-items.component";
import TodoItems from "../todo-items/todo-items.component";
import classes from "./items.module.scss";

const Items: React.FC = () => {
  const itemCtx = useContext(ItemContext);

  useEffect(() => {
    itemCtx.getItemsAsync();
  }, []);
  return (
    <div className="container-lg mt-5">
      <AddItem />
      <TodoItems />
      <DoneItems />
    </div>
  );
};
export default Items;
