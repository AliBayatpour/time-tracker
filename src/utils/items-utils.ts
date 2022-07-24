import { ItemInterface } from "../interfaces/item-interface";

// SORT ALGORITHM
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
export const stringValueGenerator = (val1?: string, val2?: string): string => {
  // IF THERE IS NO ITEM BEFORE OR AFTER
  if (!val1 && !val2) {
    return "abc";
  }
  // IF THERE IS NO ITEM AFTER
  if (val1 && !val2) {
    let res = val1.split("");
    let resIndex = 0;
    if (res[res.length - 1] !== "z") {
      resIndex = alphabet.indexOf(res[res.length - 1]) + 1;
      res[res.length - 1] = alphabet[resIndex];
      return res.join("");
    } else {
      res.push("c");
      return res.join("");
    }
  }
  // IF THERE IS NO ITEM BEFORE
  if (!val1 && val2) {
    let res = val2.split("");
    let resIndex = alphabet.indexOf(res[res.length - 1]) - 1;
    res[res.length - 1] = alphabet[resIndex];
    res.push("n");
    return res.join("");
  }

  const beforeSort = [val1, val2];
  // SORT THE STRINGS FIRST
  const afterSort = beforeSort.sort();

  if (!afterSort[0] || !afterSort[1]) {
    return "abc";
  }

  // CONVERT EACH STRING TO AN ARRAY
  const val1Arr = afterSort[0].split("");
  const val2Arr = afterSort[1].split("");

  // CALCULATE LENGTH OF EACH ARRAY
  const val1ArrLen = val1Arr.length;
  const val2ArrLen = val2Arr.length;

  // SOME VARIABLES
  let result = [];
  let breakIndex = 0;
  let compareLen = 0;

  // CHECK WHICH ARRAY LENGTH IS SMALLER
  // CHOOSE THE SIZE COMPARELEN EQUAL TO THE SMALLEST LENGTH
  if (val1ArrLen <= val2ArrLen) {
    compareLen = val1ArrLen;
  } else {
    compareLen = val2ArrLen;
  }

  let cc = 0;
  while (val1Arr[cc] === val2Arr[cc] && val1Arr[cc] && val2Arr[cc]) {
    result.push(val1Arr[cc]);
    cc++;
  }
  breakIndex = cc - 1;

  let resultIndex = 0;
  // CHECK IF THERE IS ANY IDENTICAL LETTER
  if (breakIndex >= 0) {
    // CHECK IF THERE IS ANY LETTER AFTER THE IDENTICAL SUBSTRING
    if (breakIndex === compareLen - 1) {
      // IF NO THE LETTER BETWEEN "A" AND ...
      resultIndex = resultIndexCalculator("a", val2Arr[breakIndex + 1]);

      // IF RESULTINDEX IS "A" OR "B"
      let helperIndex = breakIndex + 1;
      while (resultIndex === 0 || resultIndex === 1) {
        result.push("a");
        helperIndex++;
        if (helperIndex > val2Arr.length - 1) {
          resultIndex = resultIndexCalculator("a", "z");
        } else {
          resultIndex = resultIndexCalculator("a", val2Arr[helperIndex]);
        }
      }
    } else {
      // IF YES FIND THE LETTER BETWEEN BREAKINDEX IN BOTH ARRAYS
      resultIndex = resultIndexCalculator(
        val1Arr[breakIndex + 1],
        val2Arr[breakIndex + 1]
      );

      // CHECK IF TWO LETTERS AFTER THE IDENTICAL STRINGS ARE CONSECUTIVE
      if (resultIndex === alphabet.indexOf(val1Arr[breakIndex + 1])) {
        // KEETP THE FIRST INDEX AFTER IDENTICALS
        result.push(val1Arr[breakIndex + 1]);
        // IF YES FIND THE FIRST LETTER AFTER THE IDENTICALS IN THE VAL1ARR
        // AND FIND THE LETTER BETWEEN IT AND "Z"
        if (breakIndex + 2 > val1ArrLen - 1) {
          // IF THERE IS NO LETTER IN BREAKINDEX + 2 THEN FIND BETWEEN A TO Z
          resultIndex = resultIndexCalculator("a", "z");
        } else {
          // IF THERE IS A LETTER IN BREAKINDEX + 2
          // FIRST CHECK IF THAT LETTER IS Z
          if (val1Arr[breakIndex + 2] === "z") {
            // IF YES INCLUDE THAT Z OR "Z"S
            let zIndexCheck = breakIndex + 2;
            while (val1Arr[zIndexCheck] === "z") {
              result.push("z");
              zIndexCheck++;
            }
            // IF THERE IS NO OTHER LETTER AFTER "Z" OR "Z"S FIND THE INDEX BETWEEN A AND Z
            if (zIndexCheck > val1ArrLen - 1) {
              resultIndex = resultIndexCalculator("a", "z");
            } else {
              // IF THERE IS A LETTER AFTER "Z" OR "Z"S FIND THE INDEX BETWEEN THAT LETTER AND Z
              resultIndex = resultIndexCalculator(val1Arr[zIndexCheck], "z");
            }
          } else {
            //THEN FIND INDEX BETWEEN THAT LETTER TO Z
            resultIndex = resultIndexCalculator(val1Arr[breakIndex + 2], "z");
          }
        }
      }
    }

    result.push(alphabet[resultIndex]);
  }
  return result.join("");
};

const resultIndexCalculator = (param1: string, param2: string) => {
  return Math.floor((alphabet.indexOf(param1) + alphabet.indexOf(param2)) / 2);
};

// FETCH ITEMS
export const getItemsAsyncReq = async (): Promise<ItemInterface[] | []> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/item/`,
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
    const json = (await response.json()) as ItemInterface[];
    if (json.length) {
      return json;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Index Out of Bounds");
  }
};

// ADD
export const addItemAsyncReq = async (
  item: ItemInterface
): Promise<Response> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/item/`,
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
export const updateItemAsyncReq = async (
  item: ItemInterface
): Promise<Response> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/item/`,
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
export const deleteItemAsyncReq = async (
  item: ItemInterface
): Promise<Response> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/item/`,
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
): Promise<ItemInterface[] | []> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/item/last-n-days/${nDays}/`,
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
    const json = (await response.json()) as ItemInterface[];
    if (json.length) {
      return json;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Index Out of Bounds");
  }
};

// UTIL FUNCTIONS
export const filterTodoItems = (items: ItemInterface[]): ItemInterface[] => {
  let filteredItems = items.filter((item) => !item.done);
  return filteredItems.sort((a, b) => (a.sort > b.sort ? 1 : -1));
};
export const filterDoneItems = (items: ItemInterface[]) => {
  let filteredItems = items.filter((item) => item.done);
  return filteredItems.sort((a, b) => (a.finished_at > b.finished_at ? 1 : -1));
};
