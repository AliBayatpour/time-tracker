import React, { ReactElement, useContext } from "react";
import { useState } from "react";
import { ItemInterface } from "../interfaces/item-interface";
import { totalTime } from "../utils/stat-utils";
import StatContext from "./stats-context";

interface ItemContextInterface {
  todoItems: ItemInterface[];
  doneItems: ItemInterface[];
  totalTimeToday: number;
  getItemsAsync: () => void;
  addItemAsync: (item: ItemInterface) => void;
  updateItemAsync: (item: ItemInterface, nDaysStatItem?: number) => void;
  deleteItemAsync: (item: ItemInterface, nDaysStatItem?: number) => void;
}

const ItemContext = React.createContext<ItemContextInterface>({
  todoItems: [],
  doneItems: [],
  totalTimeToday: 0,
  getItemsAsync: () => {},
  addItemAsync: (item: ItemInterface) => {},
  updateItemAsync: (item: ItemInterface, nDaysStatItem?: number) => {},
  deleteItemAsync: (item: ItemInterface, nDaysStatItem?: number) => {},
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
  const statCtx = useContext(StatContext);

  const getItemsAsync = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/item/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
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

  const updateStatItems = (nDays: number) => {
    switch (nDays) {
      case 7:
        statCtx.getLast7DaysItemsAsync();
        break;
      case 14:
        statCtx.getLast14DaysItemsAsync();
        break;
      case 30:
        statCtx.getLast30DaysItemsAsync();
        break;

      default:
        break;
    }
  };

  const addItemAsync = async (item: ItemInterface) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/item/`, {
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

  const updateItemAsync = async (
    item: ItemInterface,
    nDaysStatItem?: number
  ) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/item/`, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.ok) {
        getItemsAsync();
        if (nDaysStatItem && nDaysStatItem > 0) {
          updateStatItems(nDaysStatItem);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemAsync = async (
    item: ItemInterface,
    nDaysStatItem?: number
  ) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/item/`, {
        method: "DELETE",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.ok) {
        getItemsAsync();
        if (nDaysStatItem) {
          updateStatItems(nDaysStatItem);
        }
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
