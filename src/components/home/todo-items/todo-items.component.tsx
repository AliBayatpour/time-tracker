import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ItemInterface } from "../../../interfaces/item-interface";
import ItemContext from "../../../store/item-context";

import classes from "./todo-items.module.scss";

const TodoItems: React.FC = () => {
  const itemCtx = useContext(ItemContext);

  const updateItem = (event: any, index: number) => {
    event.preventDefault();
    let newItem: ItemInterface = {
      ...itemCtx.todoItems[index],
      category: event.target.elements.category.value,
      description: event.target.elements.description.value,
      sort: itemCtx.todoItems[index].sort,
      goal: itemCtx.todoItems[index].goal,
      done: false,
    };
    itemCtx.updateItemAsync(newItem);
  };

  const handleRemovetask = (index: number) => {
    itemCtx.deleteItemAsync(itemCtx.todoItems[index]);
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
      itemCtx.todoItems,
      result.source.index,
      result.destination.index
    );

    // todo: set new order in DB
  };
  return (
    <React.Fragment>
      <h2 className="mt-5 text-warning">Todo Items</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {itemCtx.todoItems.map((item: ItemInterface, index: number) => (
                <Draggable
                  key={item.modelID}
                  draggableId={item.modelID as string}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <form
                      onSubmit={(event) => updateItem(event, index)}
                      className="row my-3 border-primary border border-secondary py-3 "
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="todoCategoryInput">Category</label>
                          <input
                            type="text"
                            name="category"
                            className="form-control"
                            id="todoCategoryInput"
                            placeholder="category"
                            defaultValue={item.category}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="todoDescriptionInput">
                            Description
                          </label>
                          <input
                            type="text"
                            name="description"
                            className="form-control"
                            id="todoDescriptionInput"
                            placeholder="Description"
                            defaultValue={item.description}
                          />
                        </div>
                      </div>
                      <div className="col-1">
                        <div className="form-group">
                          <label htmlFor="todoGoalInput">Goal(min)</label>
                          <input
                            type="number"
                            readOnly
                            name="goal"
                            className="form-control"
                            id="todoGoalInput"
                            placeholder="Goal(min)"
                            defaultValue={item.goal}
                          />
                        </div>
                      </div>
                      <div className={`d-flex col-1 mt-4`}>
                        <button type="submit" className={`btn btn-info`}>
                          Update
                        </button>
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
                    </form>
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
