import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../hooks/use-input";
import { Item } from "../../../interfaces/item-interface";
import { itemActions } from "../../../store/item/item.slice";
import {
  selectIsPaused,
  selectIsStarted,
} from "../../../store/timer/timer.selector";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import Button from "../../shared/button/Button.component";
import Input from "../../shared/input/input";

type Props = {
  item: Item;
  index: number;
};

const TodoItem: React.FC<Props> = ({ item, index }) => {
  const dispatch = useDispatch();

  const isPaused = useSelector(selectIsPaused);
  const isStarted = useSelector(selectIsStarted);

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
    value: enteredGoal,
    isValid: enteredGoalIsValid,
    hasError: goalHasError,
    valueChangeHandler: goalChangeHandler,
    inputBlurHandler: goalBlurHandler,
    defaultValueHandler: goalDefaultValueHandler,
  } = useInput(isNumWithLimit);

  const updateItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !enteredCategoryIsValid ||
      !enteredDescriptionIsValid ||
      !enteredGoalIsValid
    ) {
      return;
    }
    let newItem: Item = {
      ...item,
      category: enteredCategory,
      description: enteredDescription,
      sort: item.sort,
      goal: Number(enteredGoal),
      done: false,
    };
    dispatch(itemActions.updateItemStart(newItem));
  };

  return (
    <form onSubmit={(event) => updateItem(event)}>
      <div className="row gap-1">
        <div className="col-8">
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
        </div>

        <div className="col-4">
          <Input
            type="number"
            readonly={index === 0 && (isStarted || isPaused) ? true : false}
            id="goal"
            label="Goal"
            value={enteredGoal}
            onBlur={goalBlurHandler}
            onChange={goalChangeHandler}
            hasError={goalHasError}
            onDefaultValue={goalDefaultValueHandler}
            defaultValue={item.goal.toString()}
          />
        </div>
      </div>

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
        textArea
      />
      <Button variant="tertiary" type="submit">
        Update
      </Button>
    </form>
  );
};

export default TodoItem;
