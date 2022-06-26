import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { ItemInterface } from "../../../interfaces/item-interface";
import {
  convertMinToReadable,
  formatDateV1,
  getLastNDays,
} from "../../../utils/date-utils";
import { totalTime } from "../../../utils/stat-utils";
import classes from "./past-items.module.scss";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";
import { ReactComponent as Update } from "../../../assets/icons/update.svg";
import { ReactComponent as PastItemsIcon } from "../../../assets/icons/past-items.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemStart,
  updateItemStart,
} from "../../../store/item/item.action";
import {
  selectLast14DaysItems,
  selectLast30DaysItems,
  selectLast7DaysItems,
} from "../../../store/item/item.selector";

type Props = {
  nDays: number;
};
const PastItems: React.FC<Props> = ({ nDays }) => {
  const dispatch = useDispatch();
  const last7DaysItems = useSelector(selectLast7DaysItems);
  const last14DaysItems = useSelector(selectLast14DaysItems);
  const last30DaysItems = useSelector(selectLast30DaysItems);

  const [selectDate, setSelectDate] = useState<string>("");
  const updateBtnsRef = useRef<HTMLButtonElement[]>([]);

  const updateItem = (event: any, item: ItemInterface, index: number) => {
    event.preventDefault();
    let newItem: ItemInterface = {
      ...item,
      category: event.target.elements.category.value,
      description: event.target.elements.description.value,
      progress: Number(event.target.elements.progress.value),
    };
    dispatch(updateItemStart(newItem));
    (updateBtnsRef.current[index] as HTMLButtonElement).disabled = true;
  };

  const handleRemovetask = (item: ItemInterface) => {
    dispatch(deleteItemStart(item));
  };

  const onChangeForm = (event: any, item: ItemInterface, index: number) => {
    if (
      event.target.form.elements.category.value === item.category &&
      event.target.form.elements.description.value === item.description &&
      Number(event.target.form.elements.progress.value) === item.progress
    ) {
      (updateBtnsRef.current[index] as HTMLButtonElement).disabled = true;
    } else {
      (updateBtnsRef.current[index] as HTMLButtonElement).disabled = false;
    }
  };

  const fileterItems = (): ItemInterface[] => {
    let items: ItemInterface[] = [];
    switch (nDays) {
      case 7:
        items = last7DaysItems;
        break;
      case 14:
        items = last14DaysItems;
        break;
      case 30:
        items = last30DaysItems;
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
        <PastItemsIcon width={30} />
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
      {fileterItems().map((item: ItemInterface, index: number) => (
        <form
          key={item.modelID}
          onChange={(event) => onChangeForm(event, item, index)}
          onSubmit={(event) => updateItem(event, item, index)}
          className="row my-3 text-light border-primary border border-secondary py-3 position-relative"
        >
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="doneCategoryInput">Category</label>
              <input
                type="text"
                name="category"
                className="form-control"
                id="doneCategoryInput"
                placeholder="category"
                defaultValue={item.category}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="doneDescriptionInput">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                id="doneDescriptionInput"
                placeholder="Description"
                defaultValue={item.description}
              />
            </div>
          </div>
          <div className="col-1">
            <div className="form-group">
              <label htmlFor="doneGoalInput">
                <small>Progress(min)</small>
              </label>
              <input
                type="number"
                name="progress"
                className="form-control"
                id="doneGoalInput"
                placeholder="Progress (min)"
                defaultValue={item.progress}
              />
            </div>
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
              <Update height={20} />
            </button>
          </div>
          <div className={`col-1 mt-4`}>
            <button
              type="button"
              onClick={() => handleRemovetask(item)}
              className={`btn btn-light`}
            >
              <Trash height={20} />
            </button>
          </div>
        </form>
      ))}
    </React.Fragment>
  );
};

export default PastItems;
