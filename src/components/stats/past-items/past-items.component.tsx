import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Item } from "../../../interfaces/item-interface";
import {
  convertMinToReadable,
  formatDateV1,
  getLastNDays,
} from "../../../utils/date-utils";
import { totalTime } from "../../../utils/stat-utils";
import trashIcon from "../../../assets/icons/trash.svg";
import updateIcon from "../../../assets/icons/update.svg";
import pastItemsIcon from "../../../assets/icons/past-items.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLast14DaysItems,
  selectLast28DaysItems,
  selectLast7DaysItems,
} from "../../../store/item/item.selector";
import { itemActions } from "../../../store/item/item.slice";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import useInput from "../../../hooks/use-input";
import Input from "../../shared/input/input";

type Props = {
  nDays: number;
};
const PastItems: React.FC<Props> = ({ nDays }) => {
  const dispatch = useDispatch();
  const last7DaysItems = useSelector(selectLast7DaysItems);
  const last14DaysItems = useSelector(selectLast14DaysItems);
  const last28DaysItems = useSelector(selectLast28DaysItems);

  const [selectDate, setSelectDate] = useState<string>("");

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
    value: enteredProgress,
    isValid: enteredProgressIsValid,
    hasError: progressHasError,
    valueChangeHandler: progressChangeHandler,
    inputBlurHandler: progressBlurHandler,
  } = useInput(isNumWithLimit);

  const updateBtnsRef = useRef<HTMLButtonElement[]>([]);

  const updateItem = (event: any, item: Item, index: number) => {
    event.preventDefault();
    if (
      !enteredCategoryIsValid ||
      !enteredDescriptionIsValid ||
      !enteredProgressIsValid
    ) {
      return;
    }
    let newItem: Item = {
      ...item,
      category: enteredCategory,
      description: enteredDescription,
      progress: Number(enteredProgress),
    };
    dispatch(itemActions.updateItemStart(newItem));
    (updateBtnsRef.current[index] as HTMLButtonElement).disabled = true;
  };

  const handleRemovetask = (item: Item) => {
    dispatch(itemActions.deleteItemStart(item));
  };

  const onChangeForm = (item: Item, index: number) => {
    if (
      enteredCategory === item.category &&
      enteredDescription === item.description &&
      Number(enteredProgress) === item.progress
    ) {
      (updateBtnsRef.current[index] as HTMLButtonElement).disabled = true;
    } else {
      (updateBtnsRef.current[index] as HTMLButtonElement).disabled = false;
    }
  };

  const fileterItems = (): Item[] => {
    let items: Item[] = [];
    switch (nDays) {
      case 7:
        items = last7DaysItems;
        break;
      case 14:
        items = last14DaysItems;
        break;
      case 28:
        items = last28DaysItems;
        break;

      default:
        break;
    }
    return items.filter(
      (item) => formatDateV1(new Date(item.finished_at * 1000)) === selectDate
    );
  };
  return (
    <React.Fragment>
      <div className="d-flex align-items-center mb-3 mt-5">
        <img src={pastItemsIcon} width={28} alt="past items" />
        <h2 className="text-light ms-3 mb-0">Past Done Items</h2>
      </div>
      <p className="text-light">Select the date to see the items and edit</p>
      <Form.Select
        aria-label="Select Date"
        value={selectDate}
        onChange={(event: any) => setSelectDate(event.target.value)}
      >
        <option>No date selected</option>
        {getLastNDays(nDays)
          .reverse()
          .map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
      </Form.Select>
      <h5 className="text-light my-3">
        Total Time: (<b>{convertMinToReadable(totalTime(fileterItems()))}</b>)
      </h5>
      {fileterItems().map((item: Item, index: number) => (
        <form
          key={item.modelID}
          onChange={(event) => onChangeForm(item, index)}
          onSubmit={(event) => updateItem(event, item, index)}
          className="row my-3 text-light border-primary border border-secondary py-3 position-relative"
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
              id="progress"
              name="progress"
              value={enteredProgress}
              onBlur={progressBlurHandler}
              onChange={progressChangeHandler}
              hasError={progressHasError}
            />
          </div>
          <div className={`d-flex col-1 mt-4`}>
            <span
              className="glyphicon glyphicon-align-left"
              aria-hidden="true"
            ></span>

            <button
              type="submit"
              className={`btn btn-light`}
              ref={(elem) =>
                (updateBtnsRef.current[index] = elem as HTMLButtonElement)
              }
              disabled
            >
              <img src={updateIcon} height={20} alt="update" />
            </button>
          </div>
          <div className={`col-1 mt-4`}>
            <button
              type="button"
              onClick={() => handleRemovetask(item)}
              className={`btn btn-light`}
            >
              <img src={trashIcon} height={20} alt="trash" />
            </button>
          </div>
        </form>
      ))}
    </React.Fragment>
  );
};

export default PastItems;
