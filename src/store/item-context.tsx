import React, { ReactElement } from "react";
import { useState } from "react";
import { ItemInterface } from "../interfaces/item-interface";
import { totalTime } from "../utils/items-utils";

interface ItemContextInterface {
  todoItems: ItemInterface[];
  doneItems: ItemInterface[];
  totalTimeToday: number;
  getItemsAsync: () => void;
  addItemAsync: (item: ItemInterface) => void;
  updateItemAsync: (item: ItemInterface) => void;
  deleteItemAsync: (item: ItemInterface) => void;
}

const ItemContext = React.createContext<ItemContextInterface>({
  todoItems: [],
  doneItems: [],
  totalTimeToday: 0,
  getItemsAsync: () => {},
  addItemAsync: (item: ItemInterface) => {},
  updateItemAsync: (item: ItemInterface) => {},
  deleteItemAsync: (item: ItemInterface) => {},
});

const filterTodoItems = (items: ItemInterface[]): ItemInterface[] => {
  let filteredItems = items.filter((item) => !item.done);
  return filteredItems.sort((a, b) => (a.sort > b.sort ? 1 : -1));
};
const filterDoneItems = (items: ItemInterface[]) => {
  return items.filter((item) => item.done);
};

type Props = {
  children: JSX.Element;
};
export const ItemContextProvider = (props: Props): ReactElement<any, any> => {
  const [todoItems, setTodoItems] = useState<ItemInterface[]>([]);
  const [doneItems, setDoneItems] = useState<ItemInterface[]>([]);
  const [totalTimeToday, settotalTimeToday] = useState<number>(0);

  const getItemsAsync = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/item/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const json = (await response.json()) as ItemInterface[];
      if (json.length) {
        const tempDoneItems = filterDoneItems([...json]);
        setTodoItems(filterTodoItems([...json]));
        setDoneItems(tempDoneItems);
        settotalTimeToday(totalTime(tempDoneItems));
      } else {
        setTodoItems([]);
        setDoneItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItemAsync = async (item: ItemInterface) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/item/", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.ok) {
        getItemsAsync();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateItemAsync = async (item: ItemInterface) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/item/", {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.ok) {
        getItemsAsync();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemAsync = async (item: ItemInterface) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/item/", {
        method: "DELETE",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.ok) {
        getItemsAsync();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const contextValue = {
    todoItems: todoItems,
    doneItems: doneItems,
    totalTimeToday: totalTimeToday,
    getItemsAsync: getItemsAsync,
    addItemAsync: addItemAsync,
    updateItemAsync: updateItemAsync,
    deleteItemAsync: deleteItemAsync,
  };

  return (
    <ItemContext.Provider value={contextValue}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
