import { useState } from "react";
import { Item } from "../../../interfaces/item.interface";
import { Card, CardContent } from "@mui/material";
import TodoItemReadMode from "../todoItemReadMode/TodoItemReadMode";
import TodoItemEditMode from "../todoItemEditMode/TodoItemEditMode";

type Props = {
  item: Item;
  index: number;
};

const TodoItem: React.FC<Props> = ({ item, index }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const goToReadMode = () => {
    setEditMode(false);
  };

  const goToEditMode = () => {
    setEditMode(true);
  };

  return (
    <Card className="w-100 mb-3">
      <CardContent>
        {editMode ? (
          <TodoItemEditMode
            item={item}
            goToReadMode={goToReadMode}
            index={index}
          />
        ) : (
          <TodoItemReadMode item={item} goToEditMode={goToEditMode} />
        )}
      </CardContent>
    </Card>
  );
};

export default TodoItem;
