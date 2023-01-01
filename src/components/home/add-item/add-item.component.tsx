import { Item } from "../../../interfaces/item-interface";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import React, { Fragment, useState } from "react";
import { itemActions } from "../../../store/item/item.slice";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import { stringValueGenerator } from "../../../utils/string-value-generator-utils";
import classes from "./add-item.module.scss";
import { Button, Fab, IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

type Form = {
  category: { value: string; isValid: boolean };
  goal: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
};

const formInitialState = {
  category: { value: "", isValid: false },
  goal: { value: "", isValid: false },
  description: { value: "", isValid: false },
};

const AddItem: React.FC = () => {
  const todoItems = useSelector(selectTodoItems);
  const dispatch = useDispatch();
  const [form, setForm] = useState<Form>(formInitialState);

  const [showModal, setShowModal] = useState<boolean>(false);

  const generateSortValue = (): string => {
    const todoItemsLength = todoItems.length;
    return todoItemsLength
      ? stringValueGenerator(todoItems[todoItemsLength - 1].sort)
      : stringValueGenerator();
  };

  let formIsValid = false;
  if (form.category.isValid && form.description.isValid && form.goal.isValid) {
    formIsValid = true;
  }

  const addItem = (event: any) => {
    event.preventDefault();

    if (
      !form.category.isValid ||
      !form.description.isValid ||
      !form.goal.isValid
    ) {
      return;
    }

    let newItem: Item = {
      userId: localStorage.getItem("sub") as string,
      category: form.category.value,
      description: form.description.value,
      sort: generateSortValue(),
      progress: 0,
      goal: Number(form.goal.value),
      done: false,
      finishedAt: "0",
    };

    dispatch(itemActions.addItemStart(newItem));
    setForm(formInitialState);
    onSetShowModal(false);
  };

  const onSetShowModal = (val: boolean) => {
    setShowModal(val);
  };

  const validateInput = (inputKey: keyof Form, value: string): boolean => {
    switch (inputKey) {
      case "category":
      case "description":
        return isNotEmpty(value);
      case "goal":
        return isNumWithLimit(value);
      default:
        return false;
    }
  };

  const changeFormHandler = (key: keyof Form, value: string) => {
    setForm((prev) => {
      return {
        ...prev,
        [key]: { value: value, isValid: validateInput(key, value) },
      };
    });
  };

  const Backdrop = () => {
    return (
      <div
        className={`${classes.backdrop} position-fixed`}
        onClick={() => onSetShowModal(false)}
      ></div>
    );
  };

  return (
    <div className="row">
      <Fab
        className={classes.addBut}
        color="primary"
        aria-label="add"
        onClick={() => onSetShowModal(true)}
        size="large"
      >
        <Add />
      </Fab>

      {showModal ? (
        <Fragment>
          <Backdrop />,
          <div
            className={`${classes.modal} ${classes["modal--primary"]} w-100 position-fixed p-3`}
          >
            <h3 className={`${classes.modal__label} mb-3`}>Add Task</h3>
            <div className={`${classes.modal__body}`}>
              <form onSubmit={addItem}>
                <div className="row gap-1">
                  <div className="col-8">
                    <TextField
                      type="text"
                      id="category"
                      label="Category"
                      value={form.category.value}
                      onChange={(event) =>
                        changeFormHandler("category", event?.target.value)
                      }
                      error={!form.category.isValid}
                      required
                    />
                  </div>

                  <div className="col-4">
                    <TextField
                      type="number"
                      id="goal"
                      label="Goal"
                      value={form.goal.value}
                      onChange={(event) =>
                        changeFormHandler("goal", event?.target.value)
                      }
                      error={!form.goal.isValid}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      type="text"
                      id="description"
                      label="Description"
                      value={form.description.value}
                      onChange={(event) =>
                        changeFormHandler("description", event?.target.value)
                      }
                      error={!form.description.isValid}
                      multiline
                      required
                    />
                  </div>
                </div>

                <div className="d-flex mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!formIsValid}
                  >
                    Add task
                  </Button>
                  <Button
                    className="ms-auto"
                    variant="outlined"
                    color="warning"
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
