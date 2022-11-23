import React from "react";
import { Item } from "../../../interfaces/item-interface";
import { convertMinToReadable } from "../../../utils/date-utils";
import doneList from "../../../assets/icons/done-list.svg";
import { selectDoneItems } from "../../../store/item/item.selector";
import { useSelector } from "react-redux";
import { totalTime } from "../../../utils/stat-utils";
import styles from "./done-items.module.scss";

import DoneItem from "../done-item/Done-item";
import Card from "../../shared/card/Card.component";

const DoneItems: React.FC = () => {
  const doneItems = useSelector(selectDoneItems);

  return (
    <div className={`${styles.mainContainer} d-flex justify-content-center`}>
      <div
        className={`my-5 bg-mirror-white p-3 w-100 d-flex flex-column align-items-center ${styles.listBox}`}
      >
        <img alt="done" src={doneList} width={30} />
        <h2>Done Items</h2>

        <h5 className="mb-4">
          Total Time Today: (<b>{convertMinToReadable(totalTime(doneItems))}</b>
          )
        </h5>
        {doneItems.map((item: Item, index: number) => (
          <Card variant="tertiary" key={"done" + index} className="mb-3">
            <DoneItem item={item} index={index} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoneItems;
