import { useDispatch } from "react-redux";
import { Item } from "../../../interfaces/item-interface";
import { itemActions } from "../../../store/item/item.slice";
import {
  convertDateNumToTime,
  convertMinToReadable,
} from "../../../utils/date-utils";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import { useState, useEffect, useMemo } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { Category, Update, Description } from "@mui/icons-material";

type Props = {
  item: Item;
  index: number;
};

type DoneForm = {
  category: { value: string; isValid: boolean };
  progress: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
};

const todoInitialState = {
  category: { value: "", isValid: false },
  progress: { value: "", isValid: false },
  description: { value: "", isValid: false },
};

const DoneItem: React.FC<Props> = ({ item, index }) => {
  const dispatch = useDispatch();

  const [updateActive, setUpdateActive] = useState(false);
  const [doneForm, setDoneForm] = useState<DoneForm>(todoInitialState);
  const [editMode, setEditMode] = useState<boolean>(false);

  const memoizedItem = useMemo(() => item, [item]);

  useEffect(() => {
    setDoneForm({
      category: { value: item.category, isValid: true },
      progress: { value: item.progress.toString(), isValid: true },
      description: { value: item.description, isValid: true },
    });
  }, [memoizedItem]);

  useEffect(() => {
    if (
      (doneForm.category.value && item.category !== doneForm.category.value) ||
      (doneForm.description.value &&
        item.description !== doneForm.description.value) ||
      (doneForm.progress.value && item.progress !== +doneForm.progress.value)
    ) {
      setUpdateActive(true);
    } else {
      setUpdateActive(false);
    }
  }, [
    doneForm.category.value,
    doneForm.progress.value,
    doneForm.description.value,
  ]);

  const validateInput = (inputKey: keyof DoneForm, value: string): boolean => {
    switch (inputKey) {
      case "category":
      case "description":
        return isNotEmpty(value);
      case "progress":
        return isNumWithLimit(value);
      default:
        return false;
    }
  };

  const changeFormHandler = (key: keyof DoneForm, value: string) => {
    setDoneForm((prev) => {
      return {
        ...prev,
        [key]: { value: value, isValid: validateInput(key, value) },
      };
    });
  };

  const updateItem = (event: any, index: number) => {
    event.preventDefault();
    if (
      !doneForm.category.isValid ||
      !doneForm.description.isValid ||
      !doneForm.progress.isValid
    ) {
      return;
    }
    let newItem: Item = {
      ...item,
      category: doneForm.category.value,
      description: doneForm.description.value,
      sort: item.sort,
      progress: Number(doneForm.progress.value),
      done: true,
    };
    dispatch(itemActions.updateItemStart(newItem));
  };
  return (
    <Card className="w-100 mb-3">
      <CardContent>
        {editMode ? (
          <form key={item.id} onSubmit={(event) => updateItem(event, index)}>
            <div className="text-secondary">
              <b>
                Finished at: <b>{convertDateNumToTime(+item.finishedAt)}</b>
              </b>
            </div>
            <div className="row gap-1">
              <div className="col-8">
                <TextField
                  type="text"
                  id="category"
                  label="Category"
                  value={doneForm.category.value}
                  onChange={(event) =>
                    changeFormHandler("category", event?.target.value)
                  }
                  error={!doneForm.category.isValid}
                />
              </div>

              <div className="col-4">
                <TextField
                  type="number"
                  id="progress"
                  label="Progress"
                  value={doneForm.progress.value}
                  onChange={(event) =>
                    changeFormHandler("progress", event?.target.value)
                  }
                  error={!doneForm.progress.isValid}
                />
              </div>
            </div>
            <TextField
              type="text"
              id="description"
              label="Description"
              value={doneForm.description.value}
              onChange={(event) =>
                changeFormHandler("description", event?.target.value)
              }
              error={!doneForm.description.isValid}
              multiline
            />

            {updateActive && (
              <Button variant="contained" type="submit">
                Update
              </Button>
            )}
          </form>
        ) : (
          <div className="row">
            <div className="col-8">
              <div className="d-flex align-items-center">
                <Category color="info" />
                <b className="ms-1">{item.category}</b>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex align-items-center">
                <Update color="info" />
                <b className="ms-1">{convertMinToReadable(item.progress)}</b>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="d-flex">
                <Description color="info" />
                <small className="ms-1 mt-1">{item.description}</small>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoneItem;
