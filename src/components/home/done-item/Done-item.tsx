import { useDispatch } from "react-redux";
import { Item } from "../../../interfaces/item-interface";
import { itemActions } from "../../../store/item/item.slice";
import {
  convertDateNumToTime,
  convertMinToReadable,
} from "../../../utils/date-utils";
import {
  isNotEmpty,
  isNumWithLimit,
} from "../../../utils/input-validators-utils";
import { useState, useEffect, useMemo } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { Category, Update, Description } from "@mui/icons-material";
import DoneItemEditMode from "../doneItemEditMode/DoneItemEditMode";
import DoneItemReadMode from "../doneItemReadMode/DoneItemReadMode";

type Props = {
  item: Item;
  index: number;
};

const DoneItem: React.FC<Props> = ({ item, index }) => {
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
          <DoneItemEditMode
            item={item}
            goToReadMode={goToReadMode}
            index={index}
          />
        ) : (
          <DoneItemReadMode item={item} goToEditMode={goToEditMode} />
        )}
      </CardContent>
    </Card>
  );
};

export default DoneItem;
