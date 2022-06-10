import React from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import classes from "./todo-items.module.scss";

const TodoItems: React.FC = () => {
  const [items, setItems] = useState<any>([
    {
      id: "item-1",
      category: "item-1",
      description: "item-1 description",
      done: false,
      goal: 3600000,
    },
    {
      id: "item-2",
      category: "item-2",
      description: "item-2 description",
      done: false,
      goal: 3600000,
    },
    {
      id: "item-3",
      category: "item-3",
      description: "item-3 description",
      done: false,
      goal: 3600000,
    },
  ]);

  const handleChangeInput = (index: number, event: any) => {
    let changedItems = [...items];
    changedItems[index][event.target.name] = event.target.value;
    setItems(changedItems);
  };

  const handleRemovetask = (index: number) => {
    let values = [...items];
    values.splice(index, 1);
    setItems([...values]);
  };
  // a little function to help us with reordering the result
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    console.log(list);
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result: any) => {
    console.log(result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const resItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(resItems);
  };
  return (
    <React.Fragment>
      <h2 className="mt-5 text-warning">Todo Items</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item: any, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="row my-3 border-primary border border-secondary py-3 "
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Category
                          </label>
                          <input
                            type="text"
                            name="category"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="category"
                            value={item.category}
                            onChange={(event) =>
                              handleChangeInput(index, event)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-7">
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Description
                          </label>
                          <input
                            type="text"
                            name="description"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="category"
                            value={item.description}
                            onChange={(event) =>
                              handleChangeInput(index, event)
                            }
                          />
                        </div>
                      </div>
                      <div className={`${classes.delBtn}  d-flex col-1 mt-4`}>
                        <button
                          type="button"
                          onClick={() => handleRemovetask(index)}
                          className={`bg-danger text-white rounded-circle p-0 overflow-hidden my-auto`}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </React.Fragment>
  );
};
export default TodoItems;
