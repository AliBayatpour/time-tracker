import { ItemInterface } from "../../../interfaces/item-interface";
import classes from "./add-item.module.scss";

const AddItem: React.FC = () => {
  const addItem = (event: any) => {
    event.preventDefault();
    let newitem: ItemInterface = {
      id: "",
      category: event.target.elements.category.value,
      description: event.target.elements.description.value,
      goal: event.target.elements.goal.value,
      done: false,
    };
    console.log(newitem);
  };
  return (
    <form
      className="row my-3 border border-secondary py-3 position-relative"
      onSubmit={addItem}
    >
      <h2 className=" text-primary">Add Item</h2>
      <div className="col-4">
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="category"
          />
        </div>
      </div>
      <div className="col-5">
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="category"
          />
        </div>
      </div>
      <div className="col-2">
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Goal(min)</label>
          <input
            type="number"
            name="goal"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="category"
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
