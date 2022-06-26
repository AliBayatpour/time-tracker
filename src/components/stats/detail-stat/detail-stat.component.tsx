import { ChartCategoryInterface } from "../../../interfaces/chart-category-interface";
import { ItemInterface } from "../../../interfaces/item-interface";
import { convertMinToReadable } from "../../../utils/date-utils";

import {
  calculateTotalForCategory,
  totalTime,
} from "../../../utils/stat-utils";

type Props = {
  items: ItemInterface[];
  nDays: number;
  statData: {
    lastNDaysChartResult: {
      [key: string]: any;
    }[];
    itemCategories: ChartCategoryInterface[];
  };
};
const DetailStat: React.FC<Props> = ({ items, nDays, statData }) => {
  const calculateDetailCategoryStat = () => {
    let categories: ChartCategoryInterface[] = [];
    let chartData: {
      [key: string]: any;
    }[] = [];
    categories = statData.itemCategories;
    chartData = statData.lastNDaysChartResult;

    return categories?.map((categoryObj, index) => (
      <div className="col-3" key={`catDetail-${index}`}>
        <div className="card my-3" style={{ borderColor: categoryObj.color }}>
          <h5 className="card-header" style={{ color: categoryObj.color }}>
            <b>{categoryObj.category}</b>
          </h5>
          <b className="card-title ps-3">
            {calculateTotalForCategory(categoryObj.category, chartData)}
          </b>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="mt-5 mb-3 row">
        <div className="col-12">
          <h4 className="text-capitalize mb-3">
            <b>Last {nDays} days</b>
          </h4>
        </div>
        <div className="col-6">
          <div className="card">
            <h5 className="card-header">
              <b>Total Time:</b>
            </h5>
            <b className="card-title ps-3 text-success">
              {convertMinToReadable(totalTime(items))}
            </b>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <h5 className="card-header">
              <b>Average per day:</b>
            </h5>
            <b className="card-title ps-3 text-secondary">
              {convertMinToReadable(totalTime(items) / nDays)}
            </b>
          </div>
        </div>
      </div>
      <div className="row">{calculateDetailCategoryStat()}</div>
    </div>
  );
};
export default DetailStat;
