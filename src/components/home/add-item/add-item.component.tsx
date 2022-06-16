import { useContext } from "react";
import { ItemInterface } from "../../../interfaces/item-interface";
import ItemContext from "../../../store/item-context";
import { stringValueGenerator } from "../../../utils/items-utils";
import classes from "./add-item.module.scss";

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
    <form
      className="row my-3 border border-secondary py-3 position-relative"
      onSubmit={addItem}
    >
      <h2 className=" text-primary">Add Item</h2>
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
      <div className={`${classes.delBtn}  d-flex col-1 mt-4`}>
        <button type="submit" className="btn btn-primary btn-lg">
          +
        </button>
      </div>
    </form>
  );
};

export default AddItem;
