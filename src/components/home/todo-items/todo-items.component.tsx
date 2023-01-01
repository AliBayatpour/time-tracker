import React, { Fragment, useState } from "react";
import { Item } from "../../../interfaces/item-interface";
import { totalTodoTime } from "../../../utils/stat-utils";
import { convertMinToReadable } from "../../../utils/date-utils";
import { useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import TodoItem from "../todo-item/Todo-item.component";
import styles from "./todo-items.module.scss";

const TodoItems: React.FC = () => {
  const todoItems = useSelector(selectTodoItems);
  return (
    <div
      className={`${styles.mainContainer} h-100 d-flex justify-content-center`}
    >
      <Fragment>
        <div
          className={`my-5 p-3 w-100 d-flex flex-column align-items-center ${styles.listBox}`}
        >
          <h2>Todo Items</h2>
          <h5 className="mb-4">
            My goal Today: {convertMinToReadable(totalTodoTime(todoItems))}
          </h5>
          {todoItems.map((item: Item, index: number) => (
            <div key={item.id} className="w-100">
              <TodoItem item={item} index={index} />
            </div>
          ))}
        </div>
      </Fragment>
    </div>
  );
};
export default TodoItems;
