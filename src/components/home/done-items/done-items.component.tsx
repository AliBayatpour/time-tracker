import React, { useState } from "react";
import { ItemInterface } from "../../../interfaces/item-interface";
import classes from "./done-items.module.scss";

const DoneItems: React.FC = (props) => {
  const [doneItems, setDoneItems] = useState<ItemInterface[]>([
    {
      id: "item-done-1",
      category: "item-1",
      description: "item-1 description",
      done: true,
      goal: 3600000,
    },
    {
      id: "item-done-2",
      category: "item-2",
      description: "item-2 description",
      done: true,
      goal: 3600000,
    },
  ]);
  const handleChangeInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let changedItems = [...doneItems];
    changedItems[index][event.target.name as "description" | "category"] = event
      .target.value as string;
    setDoneItems(changedItems);
  };

  const handleRemovetask = (index: number) => {
    let values = [...doneItems];
    values.splice(index, 1);
    setDoneItems([...values]);
  };
  return (
    <React.Fragment>
      <h2 className="mt-5 text-success">Done Items</h2>
      {doneItems.map((item: ItemInterface, index: number) => (
        <div
          key={item.id}
          className="row my-3 border-primary border border-secondary py-3 position-relative"
        >
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Category</label>
              <input
                type="text"
                name="category"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="category"
                value={item.category}
                onChange={(event) => handleChangeInput(index, event)}
              />
            </div>
          </div>
          <div className="col-7">
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="category"
                value={item.description}
                onChange={(event) => handleChangeInput(index, event)}
              />
            </div>
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
        </div>
      ))}
    </React.Fragment>
  );
};

export default DoneItems;
