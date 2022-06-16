import React, { useContext, useEffect, useState } from "react";
import { ItemInterface } from "../../../interfaces/item-interface";
import ItemContext from "../../../store/item-context";
import { convertMinToReadable } from "../../../utils/date-utils";
import classes from "./done-items.module.scss";

const DoneItems: React.FC = (props) => {
  const itemCtx = useContext(ItemContext);
  const updateItem = (event: any, index: number) => {
    event.preventDefault();
    let newItem: ItemInterface = {
      ...itemCtx.doneItems[index],
      category: event.target.elements.category.value,
      description: event.target.elements.description.value,
      sort: itemCtx.doneItems[index].sort,
      progress: Number(event.target.elements.progress.value),
      done: true,
    };
    itemCtx.updateItemAsync(newItem);
  };

  const handleRemovetask = (index: number) => {
    itemCtx.deleteItemAsync(itemCtx.doneItems[index]);
  };
  return (
    <React.Fragment>
      <h2 className="mt-5 text-success">Done Items</h2>
      <h5 className="text-secondary">
        Total Time Today: (<b>{convertMinToReadable(itemCtx.totalTimeToday)}</b>
        )
      </h5>
      {itemCtx.doneItems.map((item: ItemInterface, index: number) => (
        <form
          key={item.modelID}
          onSubmit={(event) => updateItem(event, index)}
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
              onClick={() => handleRemovetask(index)}
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

export default DoneItems;
