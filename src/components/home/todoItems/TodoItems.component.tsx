import React, { Fragment, useState } from "react";
import { Item } from "../../../interfaces/item.interface";
import { totalTodoTime } from "../../../utils/stat.utils";
import { convertMinToReadable } from "../../../utils/date.utils";
import { useSelector } from "react-redux";
import {
  selectItemIsLoading,
  selectTodoItems,
} from "../../../store/item/item.selector";
import TodoItem from "../todoItem/TodoItem.component";
import styles from "./todoItems.module.scss";
import { Box, CircularProgress } from "@mui/material";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { stringValueGenerator } from "../../../utils/stringValueGenerator.utils";
import { useDispatch } from "react-redux";
import { itemActions } from "../../../store/item/item.slice";

const TodoItems: React.FC = () => {
  const todoItems = useSelector(selectTodoItems);
  const isLoading = useSelector(selectItemIsLoading);
  const dispatch = useDispatch();

  const reorder = (startIndex: number, endIndex: number) => {
    const result = [...todoItems];
    const [targetItem] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, targetItem);
    const newIdxItem = result.findIndex((elem) => elem.id === targetItem.id);
    const shouldUpdateItem = { ...targetItem };
    if (result[newIdxItem - 1] && result[newIdxItem + 1]) {
      shouldUpdateItem.sort = stringValueGenerator(
        result[newIdxItem - 1].sort,
        result[newIdxItem + 1].sort
      );
    } else if (!result[newIdxItem - 1] && result[newIdxItem + 1]) {
      shouldUpdateItem.sort = stringValueGenerator(
        "",
        result[newIdxItem + 1].sort
      );
    } else if (result[newIdxItem - 1] && !result[newIdxItem + 1]) {
      shouldUpdateItem.sort = stringValueGenerator(
        result[newIdxItem - 1].sort,
        ""
      );
    }
    dispatch(itemActions.updateItemStart(shouldUpdateItem));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    reorder(result.source.index, result.destination.index);
  };
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        border: 0,
        borderRadius: "16px",
      }}
      className={`${styles.mainContainer} d-flex justify-content-center mx-3`}
    >
      <div
        className={`my-5 p-3 w-100 d-flex flex-column align-items-center ${styles.listBox}`}
      >
        <h2>Todo Items</h2>
        <h5 className="mb-4">
          My goal Today: {convertMinToReadable(totalTodoTime(todoItems))}
        </h5>
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  className="w-100"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todoItems.map((item: Item, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={(item.id + item.userId) as string}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="w-100"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem item={item} index={index} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </Box>
  );
};
export default TodoItems;
