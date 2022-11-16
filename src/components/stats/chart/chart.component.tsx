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
import { convertMinToReadable, getWeekDay } from "../../../utils/date-utils";
import { ChartCategory } from "../../../interfaces/chart-category-interface";

type Props = {
  statData: {
    lastNDaysChartResult: {
      [key: string]: any;
    }[];
    itemCategories: ChartCategory[];
  };
};
const Chart: React.FC<Props> = ({ statData }) => {
  const CustomTooltip = (props: any) => {
    if (props.active) {
      let sumDay = 0;
      props.payload?.forEach((payload: any) => {
        sumDay = sumDay + payload.value;
      });
      return (
        <div className="bg-white badge text-start p-3 text-dark">
          <p className="label">{`${props.label}, ${getWeekDay(
            new Date(props.label).getDay()
          )}`}</p>
          <hr />
          {props.payload?.map((payload: any, index: number) => {
            return (
              <p key={`tooltip${index}`}>
                <span style={{ color: payload.fill }}>{payload.name}</span>:{" "}
                <span>{convertMinToReadable(payload.value)}</span>
              </p>
            );
          })}
          <b>
            <span>Total: </span>
            <span>{convertMinToReadable(sumDay)}</span>
          </b>
        </div>
      );
    }
    return null;
  };

  const customIntervalBar = (categories: ChartCategory[]) => {
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
          data={statData.lastNDaysChartResult}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" style={{ fill: "#ffffff" }} />
          <XAxis dataKey="date" style={{ fontSize: "10px", fill: "#ffffff" }} />

          <YAxis style={{ fontSize: "14px", fill: "#ffffff" }}>
            <Label
              value="progress (min)"
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: "#ffffff" }}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {customIntervalBar(statData.itemCategories)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
