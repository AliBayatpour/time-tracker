import React, { useEffect, useState } from "react";

import Chart from "../../components/stats/chart/chart.component";
import { Tab, Tabs } from "react-bootstrap";
import DetailStat from "../../components/stats/detail-stat/detail-stat.component";
import PastItems from "../../components/stats/past-items/past-items.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLast14DaysItems,
  selectLast14DaysStatData,
  selectLast180DaysItems,
  selectLast180DaysStatData,
  selectLast28DaysItems,
  selectLast28DaysStatData,
  selectLast360DaysItems,
  selectLast360DaysStatData,
  selectLast7DaysItems,
  selectLast7DaysStatData,
} from "../../store/item/item.selector";
import { itemActions } from "../../store/item/item.slice";

enum TabsKeys {
  LAST_7_DAYS = "last7Days",
  LAST_14_DAYS = "last14Days",
  LAST_28_DAYS = "last28Days",
  LAST_180_DAYS = "last180Days",
  LAST_360_DAYS = "last360Days",
}

const Stats: React.FC = () => {
  const dispatch = useDispatch();
  const last7DaysStatData = useSelector(selectLast7DaysStatData);
  const last14DaysStatData = useSelector(selectLast14DaysStatData);
  const last28DaysStatData = useSelector(selectLast28DaysStatData);
  const last180DaysStatData = useSelector(selectLast180DaysStatData);
  const last360DaysStatData = useSelector(selectLast360DaysStatData);

  const last7DaysItems = useSelector(selectLast7DaysItems);
  const last14DaysItems = useSelector(selectLast14DaysItems);
  const last28DaysItems = useSelector(selectLast28DaysItems);
  const last180DaysItems = useSelector(selectLast180DaysItems);
  const last360DaysItems = useSelector(selectLast360DaysItems);

  const [key, setKey] = useState<string>(TabsKeys.LAST_7_DAYS);

  useEffect(() => {
    dispatch(itemActions.fetchLastNDaysStart(7));
  }, []);

  const onSelectTab = (tabName: string | null) => {
    if (!tabName) {
      return;
    }
    switch (tabName) {
      case TabsKeys.LAST_7_DAYS:
        dispatch(itemActions.fetchLastNDaysStart(7));
        setKey(tabName);
        break;
      case TabsKeys.LAST_14_DAYS:
        dispatch(itemActions.fetchLastNDaysStart(14));
        setKey(tabName);
        break;
      case TabsKeys.LAST_28_DAYS:
        dispatch(itemActions.fetchLastNDaysStart(28));
        setKey(tabName);
        break;
      case TabsKeys.LAST_180_DAYS:
        dispatch(itemActions.fetchLastNDaysStart(180));
        setKey(tabName);
        break;
      case TabsKeys.LAST_360_DAYS:
        dispatch(itemActions.fetchLastNDaysStart(360));
        setKey(tabName);
        break;

      default:
        break;
    }
  };

  return (
    <div className="container-lg">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(tabName) => onSelectTab(tabName)}
        className="mb-3"
      >
        <Tab eventKey={TabsKeys.LAST_7_DAYS} title="Last 7 Days">
          <Chart statData={last7DaysStatData} />
          <DetailStat
            nDays={7}
            statData={last7DaysStatData}
            items={last7DaysItems}
          />
          <PastItems nDays={7} />
        </Tab>
        <Tab eventKey={TabsKeys.LAST_14_DAYS} title="Last 14 Days">
          <Chart statData={last14DaysStatData} />
          <DetailStat
            nDays={14}
            statData={last14DaysStatData}
            items={last14DaysItems}
          />
          <PastItems nDays={14} />
        </Tab>
        <Tab eventKey={TabsKeys.LAST_28_DAYS} title="Last 28 Days">
          <Chart statData={last28DaysStatData} />
          <DetailStat
            nDays={28}
            items={last28DaysItems}
            statData={last28DaysStatData}
          />
          <PastItems nDays={28} />
        </Tab>
        <Tab eventKey={TabsKeys.LAST_180_DAYS} title="Last 180 Days">
          <Chart statData={last180DaysStatData} />
          <DetailStat
            nDays={180}
            items={last180DaysItems}
            statData={last180DaysStatData}
          />
          <PastItems nDays={180} />
        </Tab>
        <Tab eventKey={TabsKeys.LAST_360_DAYS} title="Last 360 Days">
          <Chart statData={last360DaysStatData} />
          <DetailStat
            nDays={360}
            items={last360DaysItems}
            statData={last360DaysStatData}
          />
          <PastItems nDays={360} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Stats;
