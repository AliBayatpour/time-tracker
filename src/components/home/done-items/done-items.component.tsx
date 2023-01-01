import React from "react";
import { Item } from "../../../interfaces/item-interface";
import { convertMinToReadable } from "../../../utils/date-utils";
import { selectDoneItems } from "../../../store/item/item.selector";
import { useSelector } from "react-redux";
import { totalTime } from "../../../utils/stat-utils";
import styles from "./done-items.module.scss";

import DoneItem from "../done-item/Done-item";

const DoneItems: React.FC = () => {
  const doneItems = useSelector(selectDoneItems);

  return (
    <div className={`${styles.mainContainer} d-flex justify-content-center`}>
      <div
        className={`my-5 bg-mirror-white p-3 w-100 d-flex flex-column align-items-center ${styles.listBox}`}
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
    </div>
  );
};

export default DoneItems;
