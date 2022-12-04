import React, { Fragment, useState } from "react";
import { Item } from "../../../interfaces/item-interface";
import { ReactComponent as TodoListIcon } from "../../../assets/icons/todo-list.svg";
import { totalTodoTime } from "../../../utils/stat-utils";
import { convertMinToReadable } from "../../../utils/date-utils";
import { useSelector } from "react-redux";
import { selectTodoItems } from "../../../store/item/item.selector";
import MessageModal from "../../shared/message-modal/Modal.component";
import TodoItem from "../todo-item/Todo-item.component";
import Card from "../../shared/card/Card.component";
import styles from "./todo-items.module.scss";

const TodoItems: React.FC = () => {
  const todoItems = useSelector(selectTodoItems);

  const [showModal, setShowModal] = useState<boolean>(false);

  //save reference for dragItem and dragOverItem
  const [dragItem, setDragItem] = useState<Item["id"]>();
  const [dragOverItem, setDragOverItem] = useState<Item["id"]>();

  const onSetShowModal = (val: boolean) => {
    setShowModal(val);
  };

  const onDragEnd = () => {};

  return (
    <div
      className={`${styles.mainContainer} h-100 d-flex justify-content-center`}
    >
      <MessageModal
        showModal={showModal}
        onSetShowModal={onSetShowModal}
        label="Timer in progress!"
      >
        <p>
          If you want to start a new Item please Finish in progress item first
        </p>
      </MessageModal>
      <Fragment>
        <div
          className={`my-5 bg-mirror-white p-3 w-100 d-flex flex-column align-items-center ${styles.listBox}`}
        >
          <h2 className="text-secondary">Todo Items</h2>
          <h5 className="mb-4">
            My goal Today: {convertMinToReadable(totalTodoTime(todoItems))}
          </h5>
          {todoItems.map((item: Item, index: number) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => setDragItem(item.id)}
              onDragEnter={() => setDragOverItem(item.id)}
              onDragEnd={onDragEnd}
            >
              <Card variant="primary" className="mb-3">
                <TodoItem item={item} index={index} />
              </Card>
            </div>
          ))}
        </div>
      </Fragment>
    </div>
  );
};
export default TodoItems;
