import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { itemActions } from "../../../store/item/item.slice";
import AddItem from "../add-item/add-item.component";
import DoneItems from "../done-items/done-items.component";
import TodoItems from "../todo-items/todo-items.component";

const Items: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(itemActions.fetchItemsStart());
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
