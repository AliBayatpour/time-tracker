import React, { useRef } from "react";
import { ItemInterface } from "../../../interfaces/item-interface";
import { convertMinToReadable } from "../../../utils/date-utils";
import classes from "./done-items.module.scss";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";
import { ReactComponent as Update } from "../../../assets/icons/update.svg";
import { ReactComponent as DoneList } from "../../../assets/icons/done-list.svg";
import { selectDoneItems } from "../../../store/item/item.selector";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemStart,
  updateItemStart,
} from "../../../store/item/item.action";
import { totalTime } from "../../../utils/stat-utils";
import { Dropdown } from "react-bootstrap";

const DoneItems: React.FC = () => {
  const doneItems = useSelector(selectDoneItems);
  const dispatch = useDispatch();
  const updateBtnsRef = useRef<HTMLButtonElement[]>([]);

  const updateItem = (event: any, index: number) => {
    event.preventDefault();
    let newItem: ItemInterface = {
      ...doneItems[index],
      category: event.target.elements.category.value,
      description: event.target.elements.description.value,
      sort: doneItems[index].sort,
      progress: Number(event.target.elements.progress.value),
      done: true,
    };
    dispatch(updateItemStart(newItem));
    (updateBtnsRef.current[index] as HTMLButtonElement).disabled = true;
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

  const handleRemovetask = (index: number) => {
    dispatch(deleteItemStart(doneItems[index]));
  };
  return (
    <React.Fragment>
      <div className="d-flex align-items-center mb-3">
        <DoneList width={30} />
        <h2 className="text-light ms-3 mb-0">Done Items</h2>
      </div>

      <h5 className="text-light">
        Total Time Today: (<b>{convertMinToReadable(totalTime(doneItems))}</b>)
      </h5>
      {doneItems.map((item: ItemInterface, index: number) => (
        <form
          key={item.modelID}
          onChange={(event) => onChangeForm(event, item, index)}
          onSubmit={(event) => updateItem(event, index)}
          className="row d-flex justify-content-center align-items-center my-3 border-primary border border-secondary py-3 position-relative"
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
            <Dropdown className="moreItem">
              <Dropdown.Toggle variant="primary" id="dropdown-done-item">
                ...
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleRemovetask(index)}
                  className="d-flex align-items-center"
                >
                  Delete <Trash height={15} className="ms-auto" />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </form>
      ))}
    </React.Fragment>
  );
};

export default DoneItems;
