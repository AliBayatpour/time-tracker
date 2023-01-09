import React from "react";
import { Item } from "../../../interfaces/item.interface";
import { convertMinToReadable } from "../../../utils/date.utils";
import { selectDoneItems } from "../../../store/item/item.selector";
import { useSelector } from "react-redux";
import { totalTime } from "../../../utils/stat.utils";
import styles from "./doneItems.module.scss";

import DoneItem from "../doneItem/Done-item";
import { Box } from "@mui/material";

const DoneItems: React.FC = () => {
  const doneItems = useSelector(selectDoneItems);

  return (
    <Box
      sx={{ backgroundColor: "info.main", border: 0, borderRadius: "16px" }}
      className={`${styles.mainContainer} h-100 d-flex justify-content-center mx-3`}
    >
      <div
        className={`my-5 p-3 w-100 d-flex flex-column align-items-center ${styles.listBox}`}
      >
        <h2>Done Items</h2>

        <h5 className="mb-4">
          Total Progress Today: (
          <b>{convertMinToReadable(totalTime(doneItems))}</b>)
        </h5>
        {doneItems.map((item: Item, index: number) => (
          <div key={item.id} className="w-100">
            <DoneItem item={item} index={index} />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default DoneItems;
