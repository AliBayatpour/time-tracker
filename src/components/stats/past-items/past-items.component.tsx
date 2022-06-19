import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ItemInterface } from "../../../interfaces/item-interface";
import ItemContext from "../../../store/item-context";
import StatContext from "../../../store/stats-context";
import {
  convertMinToReadable,
  formatDateV1,
  getLastNDays,
} from "../../../utils/date-utils";
import { totalTime } from "../../../utils/stat-utils";
import classes from "./past-items.module.scss";

type Props = {
  nDays: number;
};
const PastItems: React.FC<Props> = ({ nDays }) => {
  const itemCtx = useContext(ItemContext);
  const statCtx = useContext(StatContext);
  const [selectDate, setSelectDate] = useState<string>("");

  const updateItem = (event: any, item: ItemInterface) => {
    event.preventDefault();
    let newItem: ItemInterface = {
      ...item,
      category: event.target.elements.category.value,
      description: event.target.elements.description.value,
      progress: Number(event.target.elements.progress.value),
    };
    itemCtx.updateItemAsync(newItem, nDays);
  };

  const handleRemovetask = (item: ItemInterface) => {
    itemCtx.deleteItemAsync(item, nDays);
  };

  const fileterItems = (): ItemInterface[] => {
    let items: ItemInterface[] = [];
    switch (nDays) {
      case 7:
        items = statCtx.last7DaysItems;
        break;
      case 14:
        items = statCtx.last14DaysItems;
        break;
      case 30:
        items = statCtx.last30DaysItems;
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
      <h2 className="mt-5 text-success">Past Done Items</h2>
      <p>Select the date to see the items and edit</p>
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
      <h5 className="text-secondary my-3">
        Total Time: (<b>{convertMinToReadable(totalTime(fileterItems()))}</b>)
      </h5>
      {fileterItems().map((item: ItemInterface, index: number) => (
        <form
          key={item.modelID}
          onSubmit={(event) => updateItem(event, item)}
          className="row my-3 border-primary border border-secondary py-3 position-relative"
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

            <button type="submit" className={`btn btn-info`}>
              Update
            </button>
          </div>
          <div className={`${classes.delBtn}  d-flex col-1 mt-4`}>
            <button
              type="button"
              onClick={() => handleRemovetask(item)}
              className={`bg-danger text-white rounded-circle p-0 overflow-hidden my-auto`}
            >
              X
            </button>
          </div>
        </form>
      ))}
    </React.Fragment>
  );
};

export default PastItems;
