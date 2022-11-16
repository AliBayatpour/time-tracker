import React, { useRef } from "react";
import { Item } from "../../../interfaces/item-interface";
import {
  convertDateNumToTime,
  convertMinToReadable,
} from "../../../utils/date-utils";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";
import { ReactComponent as Update } from "../../../assets/icons/update.svg";
import { ReactComponent as DoneList } from "../../../assets/icons/done-list.svg";
import { selectDoneItems } from "../../../store/item/item.selector";
import { useDispatch, useSelector } from "react-redux";
import { totalTime } from "../../../utils/stat-utils";
import { Dropdown } from "react-bootstrap";
import { itemActions } from "../../../store/item/item.slice";

const DoneItems: React.FC = () => {
  const doneItems = useSelector(selectDoneItems);
  const dispatch = useDispatch();
  const updateBtnsRef = useRef<HTMLButtonElement[]>([]);

  const updateItem = (event: any, index: number) => {
    event.preventDefault();
    let newItem: Item = {
      ...doneItems[index],
      category: event.target.elements.category.value,
      description: event.target.elements.description.value,
      sort: doneItems[index].sort,
      progress: Number(event.target.elements.progress.value),
      done: true,
    };
    dispatch(itemActions.updateItemStart(newItem));
    (updateBtnsRef.current[index] as HTMLButtonElement).disabled = true;
  };

  const onChangeForm = (event: any, item: Item, index: number) => {
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
    dispatch(itemActions.deleteItemStart(doneItems[index]));
  };
  return (
    <React.Fragment>
      <div className="d-flex align-items-center mb-3 mt-5">
        <DoneList width={30} />
        <h2 className="ms-3 mb-0 text-success">Done Items</h2>
      </div>

      <h5 className="text-light">
        Total Time Today: (<b>{convertMinToReadable(totalTime(doneItems))}</b>)
      </h5>
      {doneItems.map((item: Item, index: number) => (
        <form
          key={item.modelID}
          onChange={(event) => onChangeForm(event, item, index)}
          onSubmit={(event) => updateItem(event, index)}
          className="row d-flex justify-content-center align-items-center my-3 border border-success py-3 position-relative text-light"
        >
          <div className="col-12">
            <p>
              Finished at:{" "}
              <b className="text-light">
                {convertDateNumToTime(item.finished_at)}
              </b>
            </p>
          </div>
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
              <Dropdown.Toggle variant="success" id="dropdown-done-item">
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
