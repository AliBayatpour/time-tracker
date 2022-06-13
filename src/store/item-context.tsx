import React from "react";
import { useState } from "react";
import { ItemInterface } from "../interfaces/item-interface";

interface ItemContextInterface {
  todoItems: ItemInterface[];
  doneItems: ItemInterface[];
  getItemsAsync: () => void;
  addItemAsync: (item: ItemInterface) => void;
  updateItemAsync: (item: ItemInterface) => void;
  deleteItemAsync: (item: ItemInterface) => void;
}

const ItemContext = React.createContext<ItemContextInterface>({
  todoItems: [],
  doneItems: [],
  getItemsAsync: () => {},
  addItemAsync: (item: ItemInterface) => {},
  updateItemAsync: (item: ItemInterface) => {},
  deleteItemAsync: (item: ItemInterface) => {},
});

const filterTodoItems = (items: ItemInterface[]): ItemInterface[] => {
  return items.filter((item) => !item.done);
};
const filterDoneItems = (items: ItemInterface[]) => {
  return items.filter((item) => item.done);
};

export const ItemContextProvider = (props: any): any => {
  const [todoItems, setTodoItems] = useState<ItemInterface[]>([]);
  const [doneItems, setDoneItems] = useState<ItemInterface[]>([]);

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
      console.log(json);
      if (json.length) {
        setTodoItems(filterTodoItems([...json]));
        setDoneItems(filterDoneItems([...json]));
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
      const json = (await response.json()) as ItemInterface;
      console.log(json);
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
      const json = (await response.json()) as ItemInterface;
      console.log(json);
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
      const json = (await response.json()) as ItemInterface;
      console.log(json);
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
