import { useContext } from "react";
import { ChartCategoryInterface } from "../../../interfaces/chart-category-interface";
import { ItemInterface } from "../../../interfaces/item-interface";
import StatContext from "../../../store/stats-context";
import { convertMinToReadable } from "../../../utils/date-utils";
import {
  calculateTotalForCategory,
  totalTime,
} from "../../../utils/stat-utils";

type Props = {
  items: ItemInterface[];
  nDays: number;
};
const DetailStat: React.FC<Props> = ({ items, nDays }) => {
  const statCtx = useContext(StatContext);

  const calculateDetailCategoryStat = (numberOfDays: number) => {
    let categories: ChartCategoryInterface[] = [];
    let chartData: {
      [key: string]: any;
    }[] = [];
    switch (numberOfDays) {
      case 7:
        categories = statCtx.last7DaysCategories;
        chartData = statCtx.last7DaysChartData;
        break;

      default:
        break;
    }
    return categories?.map((categoryObj, index) => (
      <p key={`catDetail-${index}`} style={{ color: categoryObj.color }}>
        <span>Total {categoryObj.category}</span>:{" "}
        <span>
          {calculateTotalForCategory(categoryObj.category, chartData)}
        </span>
      </p>
    ));
  };

  return (
    <div>
      <div className="mt-5">
        <p>
          Total Time: <b>{convertMinToReadable(totalTime(items))}</b>
        </p>
        <p>
          Average per day:{" "}
          <b>{convertMinToReadable(totalTime(items) / nDays)}</b>
        </p>
      </div>
      {calculateDetailCategoryStat(nDays)}
    </div>
  );
};
export default DetailStat;
