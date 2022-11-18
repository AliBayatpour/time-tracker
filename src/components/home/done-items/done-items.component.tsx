import React, { useRef } from "react";
import { Item } from "../../../interfaces/item-interface";
import {
  convertDateNumToTime,
  convertMinToReadable,
} from "../../../utils/date-utils";
import trashIcon from "../../../assets/icons/trash.svg";
import updateIcon from "../../../assets/icons/update.svg";
import doneList from "../../../assets/icons/done-list.svg";
import { selectDoneItems } from "../../../store/item/item.selector";
import { useDispatch, useSelector } from "react-redux";
import { totalTime } from "../../../utils/stat-utils";
import { Dropdown } from "react-bootstrap";
import { itemActions } from "../../../store/item/item.slice";
import useInput from "../../../hooks/use-input";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import Input from "../../shared/input/input";

const DoneItems: React.FC = () => {
  const doneItems = useSelector(selectDoneItems);
  const dispatch = useDispatch();
  const updateBtnsRef = useRef<HTMLButtonElement[]>([]);

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

  const updateItem = (event: any, index: number) => {
    event.preventDefault();
    if (
      !enteredCategoryIsValid ||
      !enteredDescriptionIsValid ||
      !enteredProgressIsValid
    ) {
      return;
    }
    let newItem: Item = {
      ...doneItems[index],
      category: enteredCategory,
      description: enteredDescription,
      sort: doneItems[index].sort,
      progress: Number(enteredProgress),
      done: true,
    };
    dispatch(itemActions.updateItemStart(newItem));
    (updateBtnsRef.current[index] as HTMLButtonElement).disabled = true;
  };

  const onChangeForm = ( item: Item, index: number) => {
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

  const handleRemovetask = (index: number) => {
    dispatch(itemActions.deleteItemStart(doneItems[index]));
  };
  return (
    <React.Fragment>
      <div className="d-flex align-items-center mb-3 mt-5">
        <img alt="done" src={doneList} width={30} />
        <h2 className="ms-3 mb-0 text-success">Done Items</h2>
      </div>

      <h5 className="text-light">
        Total Time Today: (<b>{convertMinToReadable(totalTime(doneItems))}</b>)
      </h5>
      {doneItems.map((item: Item, index: number) => (
        <form
          key={item.modelID}
          onChange={() => onChangeForm(item, index)}
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
              <img src={updateIcon} alt="update" height={20} />
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
                  Delete{" "}
                  <img
                    src={trashIcon}
                    height={15}
                    className="ms-auto"
                    alt="trash"
                  />
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
