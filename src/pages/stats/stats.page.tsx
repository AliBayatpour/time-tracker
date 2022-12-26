import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/shared/input/input";
import Chart from "../../components/stats/chart/chart.component";
import DetailStat from "../../components/stats/detail-stat/detail-stat.component";
import useInput from "../../hooks/use-input";
import { selectStatData } from "../../store/item/item.selector";
import { itemActions } from "../../store/item/item.slice";
import { convertMinToReadable } from "../../utils/date-utils";
import classes from "./stats.module.scss";

const tabsKeys = {
  LAST_7_DAYS: "Last 7 days",
  LAST_30_DAYS: "Last 30 days",
  LAST_180_DAYS: "Last 180 days",
  LAST_360_DAYS: "Last 360 days",
};

const Stats: React.FC = () => {
  const dispatch = useDispatch();

  const statData = useSelector(selectStatData);
  const { value: enteredInterval, valueChangeHandler: intervalChangeHandler } =
    useInput();

  useEffect(() => {
    dispatch(itemActions.fetchLastNDaysStart(7));
  }, []);

  useEffect(() => {
    console.log(enteredInterval);
    switch (enteredInterval) {
      case tabsKeys.LAST_7_DAYS:
        dispatch(itemActions.fetchLastNDaysStart(7));
        break;
      case tabsKeys.LAST_30_DAYS:
        dispatch(itemActions.fetchLastNDaysStart(30));
        break;
      case tabsKeys.LAST_180_DAYS:
        dispatch(itemActions.fetchLastNDaysStart(180));
        break;
      case tabsKeys.LAST_360_DAYS:
        dispatch(itemActions.fetchLastNDaysStart(360));
        break;

      default:
        break;
    }
  }, [enteredInterval]);

  return (
    <div className="container">
      <div className={`w-100 d-flex justify-content-center`}>
        <div className={`${classes.intervalBox}`}>
          <Input
            id="interval"
            value={enteredInterval}
            onChange={intervalChangeHandler}
            inputElement="select"
            options={Object.values(tabsKeys)}
          />
        </div>
      </div>
      <Chart statData={statData} />
      <DetailStat statData={statData} />
    </div>
  );
};

export default Stats;
