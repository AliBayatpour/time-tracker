import React, { ReactElement, useState } from "react";
import { ItemInterface } from "../interfaces/item-interface";
import { StatItemInterface } from "../interfaces/stat-item-interface";
import { getLastNDays } from "../utils/date-utils";
import { convertItemsToStatFormat } from "../utils/items-utils";

interface StatContextInterface {
  last7DaysItems: StatItemInterface[];
  last14DaysItems: StatItemInterface[];
  last30DaysItems: StatItemInterface[];
  getLast7DaysItemsAsync: () => void;
  getLast14DaysItemsAsync: () => void;
  getLast30DaysItemsAsync: () => void;
  emptyItems: () => void;
}
const StatContext = React.createContext<StatContextInterface>({
  last7DaysItems: [],
  last14DaysItems: [],
  last30DaysItems: [],
  getLast7DaysItemsAsync: () => {},
  getLast14DaysItemsAsync: () => {},
  getLast30DaysItemsAsync: () => {},
  emptyItems: () => {},
});

type Props = {
  children: JSX.Element;
};

export const StatContextProvider = (props: Props): ReactElement<any, any> => {
  const [last7DaysItems, setLast7DaysItems] = useState<StatItemInterface[]>([]);

  const [last14DaysItems, setLast14DaysItems] = useState<StatItemInterface[]>(
    []
  );
  const [last30DaysItems, setLast30DaysItems] = useState<StatItemInterface[]>(
    []
  );

  const getLast7DaysItemsAsync = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/item/last-7-days",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const json = (await response.json()) as ItemInterface[];
      if (json.length) {
        let last7DaysDates: { [key: string]: any[] } = {};
        getLastNDays(7).forEach((date) => {
          last7DaysDates[date] = [];
        });

        setLast7DaysItems(convertItemsToStatFormat(json, last7DaysDates));
      } else {
        setLast7DaysItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLast14DaysItemsAsync = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/item/last-14-days",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const json = (await response.json()) as ItemInterface[];
      if (json.length) {
        let last14DaysDates: { [key: string]: any[] } = {};
        getLastNDays(14).forEach((date) => {
          last14DaysDates[date] = [];
        });
        setLast14DaysItems(convertItemsToStatFormat(json, last14DaysDates));
      } else {
        setLast14DaysItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLast30DaysItemsAsync = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/item/last-30-days",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const json = (await response.json()) as ItemInterface[];
      if (json.length) {
        let last30DaysDates: { [key: string]: any[] } = {};
        getLastNDays(30).forEach((date) => {
          last30DaysDates[date] = [];
        });
        setLast30DaysItems(convertItemsToStatFormat(json, last30DaysDates));
      } else {
        setLast30DaysItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emptyItems = () => {
    setLast14DaysItems([]);
    setLast30DaysItems([]);
    setLast7DaysItems([]);
  };

  const contextValue = {
    last7DaysItems: last7DaysItems,
    last14DaysItems: last14DaysItems,
    last30DaysItems: last30DaysItems,
    getLast7DaysItemsAsync: getLast7DaysItemsAsync,
    getLast14DaysItemsAsync: getLast14DaysItemsAsync,
    getLast30DaysItemsAsync: getLast30DaysItemsAsync,
    emptyItems: emptyItems,
  };
  return (
    <StatContext.Provider value={contextValue}>
      {props.children}
    </StatContext.Provider>
  );
};
export default StatContext;
