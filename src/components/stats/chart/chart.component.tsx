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
} from "recharts";
import { StatItemInterface } from "../../../interfaces/stat-item-interface";
import { convertMinToReadable } from "../../../utils/date-utils";

type Props = {
  items: StatItemInterface[];
};
const Chart: React.FC<Props> = (props) => {
  const CustomTooltip = (props: any) => {
    if (props.active) {
      return (
        <div className="bg-secondary badge text-start p-3">
          <p className="label">{`Date: ${props.label}`}</p>
          <p className="label mb-2">Time:</p>
          <b className="label mb-1">
            {convertMinToReadable(props.payload[0].value)}
          </b>
        </div>
      );
    }

    return null;
  };
  return (
    <div className={`${classes.mainContainer}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={props.items}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{ fontSize: "10px" }}>
            <Label
              value="Date"
              angle={0}
              position="bottom"
              style={{ textAnchor: "middle" }}
            />
          </XAxis>
          <YAxis>
            <Label
              value="Time"
              angle={270}
              position="left"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="progress" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
