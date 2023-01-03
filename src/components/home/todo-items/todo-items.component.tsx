import React, { Fragment, useState } from "react";
import { Item } from "../../../interfaces/item-interface";
import { totalTodoTime } from "../../../utils/stat-utils";
import { convertMinToReadable } from "../../../utils/date-utils";
import { useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import TodoItem from "../todo-item/Todo-item.component";
import styles from "./todo-items.module.scss";
import { Box } from "@mui/material";

const TodoItems: React.FC = () => {
  const todoItems = useSelector(selectTodoItems);
  return (
    <Box
      sx={{ backgroundColor: "primary.light" }}
      className={`${styles.mainContainer} d-flex justify-content-center`}
    >
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
    </Box>
  );
};
export default TodoItems;
