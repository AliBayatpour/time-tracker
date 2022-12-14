import { Item } from "../../../interfaces/item.interface";
import { useDispatch, useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import React, { Fragment, useState } from "react";
import { itemActions } from "../../../store/item/item.slice";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/inputValidators.utils";
import { stringValueGenerator } from "../../../utils/stringValueGenerator.utils";
import classes from "./addItem.module.scss";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  TextField,
} from "@mui/material";
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

  return (
    <div className="row">
      <Fab
        className={classes.addBut}
        color="secondary"
        aria-label="add"
        onClick={() => onSetShowModal(true)}
        size="large"
      >
        <Add />
      </Fab>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <form onSubmit={addItem}>
            <div className="row pt-3 gap-1">
              <div className="col-8">
                <TextField
                  className="w-100"
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
              <div className="col-12 mt-3">
                <TextField
                  type="text"
                  className="w-100"
                  id="description"
                  label="Description"
                  value={form.description.value}
                  onChange={(event) =>
                    changeFormHandler("description", event?.target.value)
                  }
                  error={!form.description.isValid}
                  multiline
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="d-flex mt-4">
              <Button
                color="secondary"
                type="submit"
                variant="contained"
                disabled={!formIsValid}
              >
                Add task
              </Button>
              <Button
                className="ms-auto"
                variant="text"
                color="inherit"
                onClick={() => onSetShowModal(false)}
              >
                Close
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddItem;
