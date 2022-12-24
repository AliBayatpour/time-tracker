import { Item } from "../../interfaces/item-interface";

// FETCH ITEMS
export const getItemsAsyncReq = async (): Promise<Item[] | []> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/items/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const json = (await response.json()) as { items: Item[] };
    return json.items;
  } catch (error) {
    throw new Error("Index Out of Bounds");
  }
};

// ADD
export const addItemAsyncReq = async (item: Item): Promise<Response> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/items/`,
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Index Out of Bounds");
  }
};

// UPDATE ITEM
export const updateItemAsyncReq = async (item: Item): Promise<Response> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/items/`,
      {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Index Out of Bounds");
  }
};

// DELETE
export const deleteItemAsyncReq = async (item: Item): Promise<Response> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/items/`,
      {
        method: "DELETE",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Index Out of Bounds");
  }
};

// FETCH LAST N DAYS ITEMS
export const getLastNDaysItemsAsyncReq = async (
  nDays: number
): Promise<Item[] | []> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/items/last-n-days/${nDays}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error("Index Out of Bounds");
  }
};
