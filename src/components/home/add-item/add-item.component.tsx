import { Item } from "../../../interfaces/item-interface";
import { ReactComponent as Add } from "../../../assets/icons/add.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import React, { Fragment, useState } from "react";
import { itemActions } from "../../../store/item/item.slice";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import useInput from "../../../hooks/use-input";
import Input from "../../shared/input/input";
import { stringValueGenerator } from "../../../utils/string-value-generator-utils";
import Button from "../../shared/button/Button.component";
import Modal from "../../shared/message-modal/Modal.component";
import styles from "./add-item.module.scss";

const AddItem: React.FC = () => {
  const todoItems = useSelector(selectTodoItems);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);

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
      finishedAt: "0",
    };
    dispatch(itemActions.addItemStart(newitem));
    resetCategoryInput();
    resetDescriptionInput();
    resetGoalInput();
    onSetShowModal(false);
  };

  const onSetShowModal = (val: boolean) => {
    setShowModal(val);
  };

  const Backdrop = () => {
    return (
      <div
        className={`${styles.backdrop} position-fixed`}
        onClick={() => onSetShowModal(false)}
      ></div>
    );
  };

  return (
    <div className="row">
      <Button
        className={styles.addBut}
        onClick={() => onSetShowModal(true)}
        size="fab"
        variant="tertiary"
      >
        <Add height={15} />
      </Button>
      {showModal ? (
        <Fragment>
          <Backdrop />,
          <div
            className={`${styles.modal} ${styles["modal--primary"]} w-100 position-fixed p-3`}
          >
            <h4 className={`${styles.modal__label}`}>Add Task</h4>
            <div className={`${styles.modal__body}`}>
              <h2>Add Item</h2>
              <form onSubmit={addItem}>
                <div>
                  <Input
                    type="text"
                    id="category"
                    label="Category"
                    value={enteredCategory}
                    onBlur={categoryBlurHandler}
                    onChange={categoryChangeHandler}
                    hasError={categoryHasError}
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    id="description"
                    label="Description"
                    value={enteredDescription}
                    onBlur={descriptionBlurHandler}
                    onChange={descriptionChangeHandler}
                    hasError={descriptionHasError}
                    textArea
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    id="goal"
                    label="Progress"
                    value={enteredGoal}
                    onBlur={goalBlurHandler}
                    onChange={goalChangeHandler}
                    hasError={goalHasError}
                  />
                </div>
                <div className="d-flex mt-4">
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={!formIsValid}
                  >
                    Add task
                  </Button>
                  <Button
                    className="ms-auto"
                    variant="tertiary"
                    onClick={() => onSetShowModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

export default AddItem;
