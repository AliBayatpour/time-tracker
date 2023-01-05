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
  LegendProps,
} from "recharts";
import { convertMinToReadable } from "../../../utils/date-utils";
import { ItemsReducerState } from "../../../interfaces/items-store/items-reducer-state-interface";
import { buildChartData } from "../../../utils/stat-utils";
import { Chip } from "@mui/material";

type Props = {
  statData: ItemsReducerState["statData"];
};

const Chart: React.FC<Props> = ({ statData }) => {
  const chartData = buildChartData(statData.stat);
  const CustomTooltip = (props: any) => {
    if (props.active) {
      let sumDay = 0;
      props.payload?.forEach((payload: any) => {
        sumDay = sumDay + payload.value;
      });
      return (
        <div className={`p-2 ${classes.tooltipBox} bg-mirror-white`}>
          <p className={`${classes.tooltipBox__title}`}>{props.label}</p>
          <hr className="mb-1" />
          {props.payload?.map((payload: any, index: number) => {
            return (
              <p key={`tooltip${index}`}>
                <span className="me-1" style={{ color: payload.fill }}>
                  {payload.name}:
                </span>
                <span>{convertMinToReadable(payload.value)}</span>
              </p>
            );
          })}
          <hr className="my-1" />
          <p>
            <span className={`${classes.tooltipBox__total}`}>Total: </span>
            <span>{convertMinToReadable(sumDay)}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  const renderLegend = (props: LegendProps) => {
    const { payload } = props;
    return (
      <div className="w-100 d-flex justify-content-center">
        {payload?.map((entry, index) => (
          <Chip
            sx={{ backgroundColor: entry.color, color: "primary.contrastText" }}
            key={`chip-${index}`}
            label={entry.value}
            className="mx-1"
          />
        ))}
      </div>
    );
  };

  const customIntervalBar = () => {
    return Object.entries(statData.categories).map((category, index) => (
      <Bar
        key={index}
        dataKey={category[0]}
        stackId="stack1"
        fill={category[1].color}
      />
    ));
  };
  return (
    <div className={`${classes.mainContainer}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" style={{ fill: "#ffffff" }} />
          <XAxis
            dataKey="label"
            style={{ fontSize: "10px", fill: "#ffffff" }}
          />

          <YAxis style={{ fontSize: "14px", fill: "#ffffff" }}>
            <Label
              value="progress (min)"
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: "#ffffff" }}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={(props) => renderLegend(props as LegendProps)} />

          {customIntervalBar()}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
