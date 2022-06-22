import React, { ReactElement, useState } from "react";
import { ChartCategoryInterface } from "../interfaces/chart-category-interface";
import { ItemInterface } from "../interfaces/item-interface";
import { lastNDaysChartDataBuilder } from "../utils/stat-utils";

interface StatContextInterface {
  last7DaysItems: ItemInterface[];
  last7DaysChartData: { [key: string]: any }[];
  last7DaysCategories: ChartCategoryInterface[];
  last14DaysItems: ItemInterface[];
  last14DaysChartData: { [key: string]: any }[];
  last14DaysCategories: ChartCategoryInterface[];
  last30DaysItems: ItemInterface[];
  last30DaysChartData: { [key: string]: any }[];
  last30DaysCategories: ChartCategoryInterface[];
  getLast7DaysItemsAsync: () => void;
  getLast14DaysItemsAsync: () => void;
  getLast30DaysItemsAsync: () => void;
  emptyItems: () => void;
}
const StatContext = React.createContext<StatContextInterface>({
  last7DaysItems: [],
  last7DaysChartData: [],
  last7DaysCategories: [],
  last14DaysItems: [],
  last14DaysChartData: [],
  last14DaysCategories: [],
  last30DaysItems: [],
  last30DaysChartData: [],
  last30DaysCategories: [],
  getLast7DaysItemsAsync: () => {},
  getLast14DaysItemsAsync: () => {},
  getLast30DaysItemsAsync: () => {},
  emptyItems: () => {},
});

type Props = {
  children: JSX.Element;
};

export const StatContextProvider = (props: Props): ReactElement<any, any> => {
  const [last7DaysItems, setLast7DaysItems] = useState<ItemInterface[]>([]);
  const [last7DaysChartData, setLast7DaysChartData] = useState<
    { [key: string]: any }[]
  >([]);
  const [last7DaysCategories, setLast7DaysCategories] = useState<
    ChartCategoryInterface[]
  >([]);
  const [last14DaysItems, setLast14DaysItems] = useState<ItemInterface[]>([]);
  const [last14DaysChartData, setLast14DaysChartData] = useState<
    { [key: string]: any }[]
  >([]);
  const [last14DaysCategories, setLast14DaysCategories] = useState<
    ChartCategoryInterface[]
  >([]);
  const [last30DaysItems, setLast30DaysItems] = useState<ItemInterface[]>([]);
  const [last30DaysChartData, setLast30DaysChartData] = useState<
    { [key: string]: any }[]
  >([]);
  const [last30DaysCategories, setLast30DaysCategories] = useState<
    ChartCategoryInterface[]
  >([]);

  const getLast7DaysItemsAsync = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_URL}/item/last-7-days`,
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
        setLast7DaysItems(json);
        let { lastNDaysChartResult, itemCategories } =
          lastNDaysChartDataBuilder(json, 7);
        setLast7DaysChartData(lastNDaysChartResult);
        setLast7DaysCategories(itemCategories);
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
        `${process.env.REACT_APP_BACK_END_URL}/item/last-14-days`,
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
        setLast14DaysItems(json);
        let { lastNDaysChartResult, itemCategories } =
          lastNDaysChartDataBuilder(json, 14);
        setLast14DaysChartData(lastNDaysChartResult);
        setLast14DaysCategories(itemCategories);
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
        `${process.env.REACT_APP_BACK_END_URL}/item/last-30-days`,
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
        setLast30DaysItems(json);
        let { lastNDaysChartResult, itemCategories } =
          lastNDaysChartDataBuilder(json, 30);
        setLast30DaysChartData(lastNDaysChartResult);
        setLast30DaysCategories(itemCategories);
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
    last7DaysChartData: last7DaysChartData,
    last7DaysCategories: last7DaysCategories,
    last14DaysItems: last14DaysItems,
    last14DaysChartData: last14DaysChartData,
    last14DaysCategories: last14DaysCategories,
    last30DaysItems: last30DaysItems,
    last30DaysChartData: last30DaysChartData,
    last30DaysCategories: last30DaysCategories,
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
