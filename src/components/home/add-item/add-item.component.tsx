import { Item } from "../../../interfaces/item-interface";
import Add from "../../../assets/icons/add.svg";
import addItemIcon from "../../../assets/icons/add-item.svg";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import React from "react";
import { itemActions } from "../../../store/item/item.slice";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import useInput from "../../../hooks/use-input";
import Input from "../../shared/input/input";
import { stringValueGenerator } from "../../../utils/string-value-generator-utils";

const AddItem: React.FC = () => {
  const todoItems = useSelector(selectTodoItems);
  const dispatch = useDispatch();

  const {
    value: enteredCategory,
    isValid: enteredCategoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategoryInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredGoal,
    isValid: enteredGoalIsValid,
    hasError: goalHasError,
    valueChangeHandler: goalChangeHandler,
    inputBlurHandler: goalBlurHandler,
    reset: resetGoalInput,
  } = useInput(isNumWithLimit);

  const generateSortValue = (): string => {
    const todoItemsLength = todoItems.length;
    return todoItemsLength
      ? stringValueGenerator(todoItems[todoItemsLength - 1].sort)
      : stringValueGenerator();
  };

  let formIsValid = false;
  if (
    enteredCategoryIsValid &&
    enteredDescriptionIsValid &&
    enteredGoalIsValid
  ) {
    formIsValid = true;
  }

  const addItem = (event: any) => {
    event.preventDefault();

    if (
      !enteredCategoryIsValid ||
      !enteredDescriptionIsValid ||
      !enteredGoalIsValid
    ) {
      return;
    }
    let newitem: Item = {
      userId: localStorage.getItem("sub") as string,
      category: enteredCategory,
      description: enteredDescription,
      sort: generateSortValue(),
      progress: 0,
      goal: Number(enteredGoal),
      done: false,
      finished_at: 0,
    };
    dispatch(itemActions.addItemStart(newitem));
    resetCategoryInput();
    resetDescriptionInput();
    resetGoalInput();
  };
  return (
    <React.Fragment>
      <div className="d-flex align-items-center">
        <img src={addItemIcon} width={30} alt="add list" />
        <h2 className="text-light ms-3 mb-0">Add Item</h2>
      </div>

      <form
        className="row text-light d-flex justify-content-center align-items-center my-3 border border-secondary py-3 position-relative"
        onSubmit={addItem}
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
        <div className="col-2">
          <Input
            type="number"
            id="goal"
            name="goal"
            value={enteredGoal}
            onBlur={goalBlurHandler}
            onChange={goalChangeHandler}
            hasError={goalHasError}
          />
        </div>
        <div className={`col-1 mt-4`}>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="add-but-tooltip">Add Item</Tooltip>}
          >
            <Button type="submit" variant="primary" disabled={!formIsValid}>
              <img src={Add} height={15} alt="plus" />
            </Button>
          </OverlayTrigger>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddItem;
