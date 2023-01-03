import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../components/stats/chart/chart.component";
import DetailStat from "../../components/stats/detail-stat/detail-stat.component";
import { selectStatData } from "../../store/item/item.selector";
import { itemActions } from "../../store/item/item.slice";
import classes from "./stats.module.scss";

const tabsKeys = {
  LAST_7_DAYS: "Last 7 days",
  LAST_30_DAYS: "Last 30 days",
  LAST_180_DAYS: "Last 180 days",
  LAST_360_DAYS: "Last 360 days",
};

type StatForm = {
  interval: { value: string; isValid: boolean };
};

const statInitialState = {
  interval: { value: tabsKeys.LAST_7_DAYS, isValid: true },
};

const Stats: React.FC = () => {
  const dispatch = useDispatch();
  const [statForm, setStatForm] = useState<StatForm>(statInitialState);

  const statData = useSelector(selectStatData);

  useEffect(() => {
    dispatch(itemActions.fetchLastNDaysStart(7));
  }, []);

  const changeFormHandler = (key: keyof StatForm, value: string) => {
    setStatForm((prev) => {
      return {
        ...prev,
        [key]: { value: value, isValid: true },
      };
    });
  };

  useEffect(() => {
    switch (statForm.interval.value) {
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
  }, [statForm.interval.value]);

  return (
    <div className="container">
      <div className={`w-100 d-flex justify-content-center`}>
        <div className={`${classes.intervalBox}`}>
          <TextField
            id="interval"
            value={statForm.interval.value}
            onChange={(event) =>
              changeFormHandler("interval", event?.target.value)
            }
            select
          >
            {Object.values(tabsKeys).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <Chart statData={statData} />
      <DetailStat statData={statData} />
    </div>
  );
};

export default Stats;
