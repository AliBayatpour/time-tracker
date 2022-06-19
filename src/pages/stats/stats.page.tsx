import React, { useContext, useEffect, useState } from "react";
import classes from "./stats.module.scss";

import StatContext from "../../store/stats-context";
import Chart from "../../components/stats/chart/chart.component";
import { Tab, Tabs } from "react-bootstrap";
import DetailStat from "../../components/stats/detail-stat/detail-stat.component";
import PastItems from "../../components/stats/past-items/past-items.component";

const Stats: React.FC = () => {
  enum TabsKeys {
    LAST_7_DAYS = "last7Days",
    LAST_14_DAYS = "last14Days",
    LAST_30_DAYS = "last30Days",
  }
  const statCtx = useContext(StatContext);
  const [key, setKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    onSelectTab(TabsKeys.LAST_7_DAYS);
    return () => {
      statCtx.emptyItems();
    };
  }, []);

  const onSelectTab = (tabName: string | null) => {
    if (!tabName) {
      return;
    }
    switch (tabName) {
      case TabsKeys.LAST_7_DAYS:
        statCtx.getLast7DaysItemsAsync();
        setKey(tabName);
        break;
      case TabsKeys.LAST_14_DAYS:
        statCtx.getLast14DaysItemsAsync();
        setKey(tabName);
        break;
      case TabsKeys.LAST_30_DAYS:
        statCtx.getLast30DaysItemsAsync();
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
          <Chart items={statCtx.last7DaysItems} nDays={7} />
          <DetailStat items={statCtx.last7DaysItems} nDays={7} />
          <PastItems nDays={7} />
        </Tab>
        <Tab eventKey={TabsKeys.LAST_14_DAYS} title="Last 14 Days">
          <Chart items={statCtx.last14DaysItems} nDays={14} />
          <DetailStat items={statCtx.last14DaysItems} nDays={14} />
          <PastItems nDays={14} />
        </Tab>
        <Tab eventKey={TabsKeys.LAST_30_DAYS} title="Last 30 Days">
          <Chart items={statCtx.last30DaysItems} nDays={30} />
          <DetailStat items={statCtx.last30DaysItems} nDays={30} />
          <PastItems nDays={30} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Stats;
