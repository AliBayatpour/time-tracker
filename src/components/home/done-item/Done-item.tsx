import { useDispatch } from "react-redux";
import useInput from "../../../hooks/use-input";
import { Item } from "../../../interfaces/item-interface";
import { itemActions } from "../../../store/item/item.slice";
import { convertDateNumToTime } from "../../../utils/date-utils";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import Input from "../../shared/input/input";

type Props = {
  item: Item;
  index: number;
};
const DoneItem: React.FC<Props> = ({ item, index }) => {
  const dispatch = useDispatch();

  const {
    value: enteredCategory,
    isValid: enteredCategoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    defaultValueHandler: categoryDefaultValueHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    defaultValueHandler: descriptioDefaultValueHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredProgress,
    isValid: enteredProgressIsValid,
    hasError: progressHasError,
    valueChangeHandler: progressChangeHandler,
    inputBlurHandler: progressBlurHandler,
    defaultValueHandler: progressDefaultValueHandler,
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
      ...item,
      category: enteredCategory,
      description: enteredDescription,
      sort: item.sort,
      progress: Number(enteredProgress),
      done: true,
    };
    dispatch(itemActions.updateItemStart(newItem));
  };
  return (
    <form key={item.modelID} onSubmit={(event) => updateItem(event, index)}>
      <div className="text-primary">
        <b>
          Finished at: <b>{convertDateNumToTime(item.finished_at)}</b>
        </b>
      </div>
      <Input
        type="text"
        id="category"
        label="Category"
        value={enteredCategory}
        onBlur={categoryBlurHandler}
        onChange={categoryChangeHandler}
        hasError={categoryHasError}
        onDefaultValue={categoryDefaultValueHandler}
        defaultValue={item.category}
      />

      <Input
        type="text"
        id="description"
        label="Description"
        value={enteredDescription}
        onBlur={descriptionBlurHandler}
        onChange={descriptionChangeHandler}
        hasError={descriptionHasError}
        onDefaultValue={descriptioDefaultValueHandler}
        defaultValue={item.description}
      />

      <Input
        type="number"
        id="progress"
        label="Progress"
        value={enteredProgress}
        onBlur={progressBlurHandler}
        onChange={progressChangeHandler}
        hasError={progressHasError}
        onDefaultValue={progressDefaultValueHandler}
        defaultValue={item.progress.toString()}
      />
    </form>
  );
};

export default DoneItem;
