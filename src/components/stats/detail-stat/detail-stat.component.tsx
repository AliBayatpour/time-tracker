import { StatItemInterface } from "../../../interfaces/stat-item-interface";
import { convertMinToReadable } from "../../../utils/date-utils";
import { totalTime } from "../../../utils/items-utils";

type Props = {
  items: StatItemInterface[];
  nDays: number;
};
const DetailStat: React.FC<Props> = (props) => {
  return (
    <div>
      <div className="mt-5">
        <p>
          Total Time: <b>{convertMinToReadable(totalTime(props.items))}</b>
        </p>
        <p>
          Average per day:{" "}
          <b>{convertMinToReadable(totalTime(props.items) / 7)}</b>
        </p>
      </div>
    </div>
  );
};
export default DetailStat;
