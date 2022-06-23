import React, { useContext } from "react";
import { ItemInterface } from "../../../interfaces/item-interface";
import ItemContext from "../../../store/item-context";
import { stringValueGenerator } from "../../../utils/items-utils";
import { ReactComponent as Add } from "../../../assets/icons/add.svg";
import { ReactComponent as AddItemIcon } from "../../../assets/icons/add-item.svg";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const AddItem: React.FC = () => {
  const itemCtx = useContext(ItemContext);

  const addItem = (event: any) => {
    event.preventDefault();
    const todoItemsLength = itemCtx.todoItems.length;
    let newitem: ItemInterface = {
      userId: localStorage.getItem("sub") as string,
      category: event.target.elements.category.value,
      description: event.target.elements.description.value,
      sort: todoItemsLength
        ? stringValueGenerator(itemCtx.todoItems[todoItemsLength - 1].sort)
        : stringValueGenerator(),
      progress: 0,
      goal: Number(event.target.elements.goal.value),
      done: false,
      finished_at: 0,
    };
    itemCtx.addItemAsync(newitem);
    event.target.reset();
  };
  return (
    <React.Fragment>
      <div className="d-flex align-items-center">
        <AddItemIcon width={30} />
        <h2 className="text-light ms-3 mb-0">Add Item</h2>
      </div>

      <form
        className="row text-light d-flex justify-content-center align-items-center my-3 border border-secondary py-3 position-relative"
        onSubmit={addItem}
      >
        <div className="col-3">
          <div className="form-group">
            <label htmlFor="addCategoryInput">Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              id="addCategoryInput"
              placeholder="category"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="addDescriptionInput">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              id="addDescriptionInput"
              placeholder="Description"
            />
          </div>
        </div>
        <div className="col-2">
          <div className="form-group">
            <label htmlFor="addGoalInput">Goal (min)</label>
            <input
              type="number"
              name="goal"
              className="form-control"
              id="addGoalInput"
              placeholder="Goal (min)"
              defaultValue={60}
            />
          </div>
        </div>
        <div className={`col-1 mt-4`}>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="add-but-tooltip">Add Item</Tooltip>}
          >
            <Button type="submit" variant="primary">
              <Add height={15} />
            </Button>
          </OverlayTrigger>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddItem;
