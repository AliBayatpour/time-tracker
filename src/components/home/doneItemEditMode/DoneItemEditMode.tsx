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
import { convertDateNumToTime } from "../../../utils/date-utils";

type Props = {
  item: Item;
  goToReadMode: () => void;
  index: number;
};

type DoneForm = {
  category: { value: string; isValid: boolean };
  progress: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
};

const doneInitialState = {
  category: { value: "", isValid: false },
  progress: { value: "", isValid: false },
  description: { value: "", isValid: false },
};

const DoneItemEditMode: React.FC<Props> = ({ item, goToReadMode, index }) => {
  const dispatch = useDispatch();

  const [updateActive, setUpdateActive] = useState(false);
  const [doneForm, setDoneForm] = useState<DoneForm>(doneInitialState);

  const isPaused = useSelector(selectIsPaused);
  const isStarted = useSelector(selectIsStarted);

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

  const backToReadMode = () => {
    setDoneForm({
      category: { value: item.category, isValid: true },
      progress: { value: item.progress.toString(), isValid: true },
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
          color="secondary"
          className="ms-auto"
        >
          <Close />
        </IconButton>
      </div>
      <Divider variant="middle" className="mb-3" />
      <form className="mt-2" onSubmit={(event) => updateItem(event, index)}>
        <div className="row gap-1 mb-3">
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
        <div className="row">
          <div className="col-12">
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

export default DoneItemEditMode;
