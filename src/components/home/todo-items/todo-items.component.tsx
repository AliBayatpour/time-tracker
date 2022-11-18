import React, { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Item } from "../../../interfaces/item-interface";
import trashIcon from "../../../assets/icons/trash.svg";
import duplicateIcon from "../../../assets/icons/duplicate.svg";
import updateIcon from "../../../assets/icons/update.svg";
import emptyIcon from "../../../assets/icons/empty.svg";
import todoListIcon from "../../../assets/icons/todo-list.svg";
import { totalTodoTime } from "../../../utils/stat-utils";
import { convertMinToReadable } from "../../../utils/date-utils";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import { itemActions } from "../../../store/item/item.slice";
import MessageModal from "../../shared/message-modal/message-modal.component";
import {
  selectIsPaused,
  selectIsStarted,
} from "../../../store/timer/timer.selector";
import { stringValueGenerator } from "../../../utils/string-value-generator-utils";
import useInput from "../../../hooks/use-input";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import Input from "../../shared/input/input";

const TodoItems: React.FC = () => {
  const dispatch = useDispatch();

  const todoItems = useSelector(selectTodoItems);
  const isPaused = useSelector(selectIsPaused);
  const isStarted = useSelector(selectIsStarted);

  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    value: enteredCategory,
    isValid: enteredCategoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredGoal,
    isValid: enteredGoalIsValid,
    hasError: goalHasError,
    valueChangeHandler: goalChangeHandler,
    inputBlurHandler: goalBlurHandler,
  } = useInput(isNumWithLimit);

  const updateBtnsRef = useRef<HTMLButtonElement[]>([]);

  const generateSortValue = (): string => {
    const todoItemsLength = todoItems.length;
    return todoItemsLength
      ? stringValueGenerator(todoItems[todoItemsLength - 1].sort)
      : stringValueGenerator();
  };

  const onSetShowModal = (val: boolean) => {
    setShowModal(val);
  };

  const updateItem = (event: any, index: number) => {
    event.preventDefault();
    if (
      !enteredCategoryIsValid ||
      !enteredDescriptionIsValid ||
      !enteredGoalIsValid
    ) {
      return;
    }

    let updateBtnDisabledProp = (
      updateBtnsRef.current[index] as HTMLButtonElement
    ).disabled;

    if (updateBtnDisabledProp === true) {
      return;
    }
    let newItem: Item = {
      ...todoItems[index],
      category: enteredCategory,
      description: enteredDescription,
      sort: todoItems[index].sort,
      goal: Number(enteredGoal),
      done: false,
    };
    dispatch(itemActions.updateItemStart(newItem));
    updateBtnDisabledProp = true;
  };

  const duplicateItem = (item: Item) => {
    let newitem: Item = {
      userId: localStorage.getItem("sub") as string,
      category: item.category,
      description: item.description,
      sort: generateSortValue(),
      progress: 0,
      goal: item.goal,
      done: false,
      finished_at: 0,
    };
    dispatch(itemActions.addItemStart(newitem));
  };

  const handleRemovetask = (index: number) => {
    dispatch(itemActions.deleteItemStart(todoItems[index]));
  };
  // a little function to help us with reordering the result
  const reorder = (startIndex: any, endIndex: any) => {
    if (
      (startIndex === 0 && (isStarted || isPaused)) ||
      (endIndex === 0 && (isStarted || isPaused))
    ) {
      onSetShowModal(true);
      return;
    }
    const result = [...todoItems];
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
    dispatch(itemActions.updateItemStart(targetItem));
  };

  const onChangeForm = (item: Item, index: number) => {
    if (
      enteredCategory === item.category &&
      enteredDescription === item.description &&
      Number(enteredGoal) === item.goal
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
    reorder(result.source.index, result.destination.index);
  };
  return (
    <React.Fragment>
      <MessageModal showModal={showModal} onSetShowModal={onSetShowModal} />

      <div className="d-flex align-items-center mb-3 mt-5">
        <img src={todoListIcon} width={30} alt="todo list" />
        <h2 className="text-primary ms-3 mb-0">Todo Items</h2>
      </div>
      <h5 className="text-light">
        My goal Today: {convertMinToReadable(totalTodoTime(todoItems))}
      </h5>
      {todoItems.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center my-5">
          <h6 className="text-light text-center text-uppercase mb-0 me-3">
            Todo Empty
          </h6>
          <img src={emptyIcon} width={30} alt="empty" />
        </div>
      ) : null}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoItems.map((item: Item, index: number) => (
                <Draggable
                  key={item.modelID}
                  draggableId={item.modelID as string}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <form
                      onSubmit={(event) => updateItem(event, index)}
                      onChange={() => onChangeForm(item, index)}
                      className="row text-light d-flex justify-content-center align-items-center my-3 border border-primary py-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="col-3">
                        <Input
                          type="text"
                          id="category"
                          name="category"
                          value={enteredCategory}
                          onBlur={categoryBlurHandler}
                          onChange={categoryChangeHandler}
                          hasError={categoryHasError}
                        />
                      </div>
                      <div className="col-6">
                        <Input
                          type="text"
                          id="description"
                          name="description"
                          value={enteredDescription}
                          onBlur={descriptionBlurHandler}
                          onChange={descriptionChangeHandler}
                          hasError={descriptionHasError}
                        />
                      </div>
                      <div className="col-1">
                        <Input
                          type="number"
                          readonly={
                            index === 0 && (isStarted || isPaused)
                              ? true
                              : false
                          }
                          id="goal"
                          name="goal"
                          value={enteredGoal}
                          onBlur={goalBlurHandler}
                          onChange={goalChangeHandler}
                          hasError={goalHasError}
                        />
                      </div>
                      <div className={`d-flex col-1 mt-4`}>
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id="add-but-tooltip">Update Item</Tooltip>
                          }
                        >
                          <button
                            type="submit"
                            className={`btn btn-light`}
                            ref={(elem) =>
                              (updateBtnsRef.current[index] =
                                elem as HTMLButtonElement)
                            }
                            disabled
                          >
                            <img src={updateIcon} height={20} alt="update" />
                          </button>
                        </OverlayTrigger>
                      </div>
                      <div className={`col-1 mt-4`}>
                        <Dropdown className="moreItem">
                          <Dropdown.Toggle
                            variant="primary"
                            id="dropdown-todo-item"
                            className="text-light"
                          >
                            ...
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => handleRemovetask(index)}
                              className="d-flex align-items-center"
                            >
                              Delete{" "}
                              <img
                                src={trashIcon}
                                alt="trash"
                                height={15}
                                className="ms-auto"
                              />
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => duplicateItem(item)}
                              className="d-flex align-items-center"
                            >
                              Duplicate
                              <img
                                src={duplicateIcon}
                                alt="duplicate"
                                height={15}
                                className="ms-auto"
                              />
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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
