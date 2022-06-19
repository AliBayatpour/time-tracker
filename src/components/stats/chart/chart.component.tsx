import classes from "./chart.module.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ItemInterface } from "../../../interfaces/item-interface";
import { convertMinToReadable } from "../../../utils/date-utils";
import { useContext } from "react";
import StatContext from "../../../store/stats-context";
import { ChartCategoryInterface } from "../../../interfaces/chart-category-interface";

type Props = {
  items: ItemInterface[];
  nDays: number;
};
const Chart: React.FC<Props> = ({ items, nDays }) => {
  const statCtx = useContext(StatContext);

  const CustomTooltip = (props: any) => {
    if (props.active) {
      return (
        <div className="bg-white badge text-start p-3 text-dark">
          <p className="label">{`Date: ${props.label}`}</p>
          {props.payload.map((payload: any, index: number) => {
            return (
              <p key={`tooltip${index}`}>
                <span style={{ color: payload.fill }}>{payload.name}</span>:{" "}
                <span>{convertMinToReadable(payload.value)}</span>
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const customIntervalBar = (categories: ChartCategoryInterface[]) => {
    return categories.map((category, index) => (
      <Bar
        key={index}
        dataKey={category.category}
        stackId="stack1"
        fill={category.color}
      />
    ));
  };
  return (
    <div className={`${classes.mainContainer}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={
            nDays === 7
              ? statCtx.last7DaysChartData
              : nDays === 14
              ? statCtx.last14DaysChartData
              : nDays === 30
              ? statCtx.last30DaysChartData
              : undefined
          }
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{ fontSize: "10px" }} />

          <YAxis>
            <Label
              value="progress (min)"
              angle={270}
              position="left"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {customIntervalBar(
            nDays === 7
              ? statCtx.last7DaysCategories
              : nDays === 14
              ? statCtx.last14DaysCategories
              : nDays === 30
              ? statCtx.last30DaysCategories
              : statCtx.last7DaysCategories
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
