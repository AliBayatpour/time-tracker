import React, { useContext, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ItemInterface } from "../../../interfaces/item-interface";
import ItemContext from "../../../store/item-context";
import ModalContext from "../../../store/modal-context";
import TimerContext from "../../../store/timer-context";
import { stringValueGenerator } from "../../../utils/items-utils";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";
import { ReactComponent as Update } from "../../../assets/icons/update.svg";
import { ReactComponent as Empty } from "../../../assets/icons/empty.svg";
import { ReactComponent as TodoList } from "../../../assets/icons/todo-list.svg";

const TodoItems: React.FC = () => {
  const itemCtx = useContext(ItemContext);
  const timerCtx = useContext(TimerContext);
  const modalCtx = useContext(ModalContext);
  const updateBtnsRef = useRef<HTMLButtonElement[]>([]);

  const updateItem = (event: any, index: number) => {
    event.preventDefault();
    let newItem: ItemInterface = {
      ...itemCtx.todoItems[index],
      category: event.target.elements.category.value,
      description: event.target.elements.description.value,
      sort: itemCtx.todoItems[index].sort,
      goal: Number(event.target.elements.goal.value),
      done: false,
    };
    itemCtx.updateItemAsync(newItem);
    (updateBtnsRef.current[index] as HTMLButtonElement).disabled = true;
  };

  const handleRemovetask = (index: number) => {
    itemCtx.deleteItemAsync(itemCtx.todoItems[index]);
  };
  // a little function to help us with reordering the result
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    if (
      (startIndex === 0 && (timerCtx.isStarted || timerCtx.isPaused)) ||
      (endIndex === 0 && (timerCtx.isStarted || timerCtx.isPaused))
    ) {
      modalCtx.onSetShowModal(true);
      return;
    }
    const result = [...itemCtx.todoItems];
    const [targetItem] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, targetItem);
    const newIdxItem = result.findIndex(
      (elem) => elem.modelID === targetItem.modelID
    );
    if (result[newIdxItem - 1] && result[newIdxItem + 1]) {
      targetItem.sort = stringValueGenerator(
        result[newIdxItem - 1].sort,
        result[newIdxItem + 1].sort
      );
    } else if (!result[newIdxItem - 1] && result[newIdxItem + 1]) {
      targetItem.sort = stringValueGenerator("", result[newIdxItem + 1].sort);
    } else if (result[newIdxItem - 1] && !result[newIdxItem + 1]) {
      targetItem.sort = stringValueGenerator(result[newIdxItem - 1].sort, "");
    }
    itemCtx.updateItemAsync(targetItem);
  };

  const onChangeForm = (event: any, item: ItemInterface, index: number) => {
    if (
      event.target.form.elements.category.value === item.category &&
      event.target.form.elements.description.value === item.description &&
      Number(event.target.form.elements.goal.value) === item.goal
    ) {
      (updateBtnsRef.current[index] as HTMLButtonElement).disabled = true;
    } else {
      (updateBtnsRef.current[index] as HTMLButtonElement).disabled = false;
    }
  };
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    reorder(itemCtx.todoItems, result.source.index, result.destination.index);
  };
  return (
    <React.Fragment>
      <div className="d-flex align-items-center mb-3 mt-5">
        <TodoList width={30} />
        <h2 className="text-light ms-3 mb-0">Todo Items</h2>
      </div>

      {itemCtx.todoItems.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center my-5">
          <h6 className="text-light text-center text-uppercase mb-0 me-3">
            Todo Empty
          </h6>
          <Empty width={30} />
        </div>
      ) : null}
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
                      onChange={(event) => onChangeForm(event, item, index)}
                      className="row d-flex justify-content-center align-items-center my-3 border-primary border border-secondary py-3"
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
                            readOnly={
                              index === 0 &&
                              (timerCtx.isStarted || timerCtx.isPaused)
                                ? true
                                : false
                            }
                            name="goal"
                            className="form-control"
                            id="todoGoalInput"
                            placeholder="Goal(min)"
                            defaultValue={item.goal}
                          />
                        </div>
                      </div>
                      <div className={`d-flex col-1 mt-4`}>
                        <button
                          type="submit"
                          className={`btn btn-light`}
                          ref={(elem) =>
                            (updateBtnsRef.current[index] =
                              elem as HTMLButtonElement)
                          }
                          disabled
                        >
                          <Update height={20} />
                        </button>
                      </div>
                      <div className={`col-1 mt-4`}>
                        <button
                          type="button"
                          onClick={() => handleRemovetask(index)}
                          className={`btn btn-light`}
                        >
                          <Trash height={20} />
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
