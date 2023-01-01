import { useEffect, useMemo, useState } from "react";
import { Item } from "../../../interfaces/item-interface";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import { useSelector } from "react-redux";
import {
  selectIsPaused,
  selectIsStarted,
} from "../../../store/timer/timer.selector";
import { useDispatch } from "react-redux";
import { Button, Divider, IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { itemActions } from "../../../store/item/item.slice";

type Props = {
  item: Item;
  goToReadMode: () => void;
  index: number;
};

type TodoForm = {
  category: { value: string; isValid: boolean };
  goal: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
};

const todoInitialState = {
  category: { value: "", isValid: false },
  goal: { value: "", isValid: false },
  description: { value: "", isValid: false },
};

const TodoItemEditMode: React.FC<Props> = ({ item, goToReadMode, index }) => {
  const [todoForm, setTodoForm] = useState<TodoForm>(todoInitialState);
  const [updateActive, setUpdateActive] = useState(false);
  const dispatch = useDispatch();

  const isPaused = useSelector(selectIsPaused);
  const isStarted = useSelector(selectIsStarted);

  const memoizedItem = useMemo(() => item, [item]);

  useEffect(() => {
    setTodoForm({
      category: { value: item.category, isValid: true },
      goal: { value: item.goal.toString(), isValid: true },
      description: { value: item.description, isValid: true },
    });
  }, [memoizedItem]);

  useEffect(() => {
    if (
      (todoForm.category.value && item.category !== todoForm.category.value) ||
      (todoForm.description.value &&
        item.description !== todoForm.description.value) ||
      (todoForm.goal.value && item.goal !== +todoForm.goal.value)
    ) {
      setUpdateActive(true);
    } else {
      setUpdateActive(false);
    }
  }, [
    todoForm.category.value,
    todoForm.goal.value,
    todoForm.description.value,
  ]);

  const updateItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !todoForm.category.isValid ||
      !todoForm.description.isValid ||
      !todoForm.goal.isValid
    ) {
      return;
    }
    let newItem: Item = {
      ...item,
      category: todoForm.category.value,
      description: todoForm.description.value,
      sort: item.sort,
      goal: Number(todoForm.goal.value),
      done: false,
    };
    dispatch(itemActions.updateItemStart(newItem));
    backToReadMode();
  };

  const validateInput = (inputKey: keyof TodoForm, value: string): boolean => {
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

  const changeFormHandler = (key: keyof TodoForm, value: string) => {
    setTodoForm((prev) => {
      return {
        ...prev,
        [key]: { value: value, isValid: validateInput(key, value) },
      };
    });
  };

  const backToReadMode = () => {
    setTodoForm({
      category: { value: item.category, isValid: true },
      goal: { value: item.goal.toString(), isValid: true },
      description: { value: item.description, isValid: true },
    });
    goToReadMode();
  };

  return (
    <>
      <div className="d-flex space-between">
        <IconButton
          onClick={backToReadMode}
          aria-label="more"
          color="primary"
          className="ms-auto"
        >
          <Close />
        </IconButton>
      </div>
      <Divider variant="middle" className="mb-3" />
      <form className="mt-2" onSubmit={(event) => updateItem(event)}>
        <div className="row gap-1 mb-3">
          <div className="col-8">
            <TextField
              type="text"
              id="category"
              label="Category"
              value={todoForm.category.value}
              onChange={(event) =>
                changeFormHandler("category", event?.target.value)
              }
              error={!todoForm.category.isValid}
              required
            />
          </div>

          <div className="col-4">
            <TextField
              type="number"
              InputProps={{
                readOnly: index === 0 && (isStarted || isPaused) ? true : false,
              }}
              id="goal"
              label="Goal"
              value={todoForm.goal.value}
              onChange={(event) =>
                changeFormHandler("goal", event?.target.value)
              }
              error={!todoForm.goal.isValid}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <TextField
              type="text"
              className="w-100"
              id="description"
              label="Description"
              value={todoForm.description.value}
              onChange={(event) =>
                changeFormHandler("description", event?.target.value)
              }
              error={!todoForm.description.isValid}
              multiline
              rows={3}
              required
            />
          </div>
        </div>
        {updateActive && (
          <Button className="mt-2" variant="contained" type="submit">
            Update
          </Button>
        )}
      </form>
    </>
  );
};

export default TodoItemEditMode;
