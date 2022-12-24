import { Item } from "../../../interfaces/item-interface";
import { ItemsReducerState } from "../../../interfaces/items-store/items-reducer-state-interface";
import { convertMinToReadable } from "../../../utils/date-utils";

import { totalTime } from "../../../utils/stat-utils";

type Props = {
  items: Item[];
  nDays: number;
  statData: ItemsReducerState["statData"];
};
const DetailStat: React.FC<Props> = ({ items, nDays, statData }) => {
  return (
    <div>
      <div className="mt-5 mb-3 row">
        <div className="col-12">
          <h4 className="text-capitalize mb-3">
            <b>Last {nDays} days</b>
          </h4>
        </div>
        <div className="col-6">
          <div>
            <h5>
              <b>Total Time:</b>
            </h5>
            <b></b>
          </div>
        </div>
        <div>
          <div>
            <h5>
              <b>Average per day:</b>
            </h5>
            <b className="ps-3"></b>
          </div>
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
};
export default DetailStat;
