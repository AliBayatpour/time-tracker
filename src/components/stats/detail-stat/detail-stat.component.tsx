import { ReactComponent as VeryDissatisfied } from "../../../assets/icons/emotions/very-dissatisfied.svg";
import { ReactComponent as Dissatisfied } from "../../../assets/icons/emotions/dissatisfied.svg";
import { ReactComponent as Neutral } from "../../../assets/icons/emotions/neutral.svg";
import { ReactComponent as Satisfied } from "../../../assets/icons/emotions/satisfied.svg";
import { ReactComponent as VerySatisfied } from "../../../assets/icons/emotions/very-satisfied.svg";
import { ItemsReducerState } from "../../../interfaces/items-store/items-reducer-state-interface";
import { convertMinToReadable } from "../../../utils/date-utils";
import { Card } from "@mui/material";

type Props = {
  statData: ItemsReducerState["statData"];
};

const DetailStat: React.FC<Props> = ({ statData }) => {
  const numberOfCountedDays = Object.keys(statData.stat).length;
  const averageMinPerDay =
    statData.total /
    (numberOfCountedDays - Math.floor(numberOfCountedDays / 7));

  const satisfactionIcon =
    averageMinPerDay >= 450 ? (
      <VerySatisfied />
    ) : averageMinPerDay >= 420 ? (
      <Satisfied />
    ) : averageMinPerDay >= 360 ? (
      <Neutral />
    ) : averageMinPerDay >= 300 ? (
      <Dissatisfied />
    ) : (
      <VeryDissatisfied />
    );
  return (
    <div className="p-3">
      <div>{satisfactionIcon}</div>

      <div className="row gap-1">
        <div className="col-3">
          <Card>
            <div>
              <p>
                <b>Total:</b>
              </p>
              <p>
                <b>{convertMinToReadable(statData.total)}</b>
              </p>
            </div>
          </Card>
        </div>
        <div className="col-3">
          <Card>
            <div>
              <p>
                <b>Average per day (6 Days):</b>
              </p>
              <p>
                <b>{convertMinToReadable(averageMinPerDay)}</b>
              </p>
            </div>
          </Card>
        </div>

        {Object.entries(statData.categories).map((statItem, index) => (
          <div className="col-3" key={statItem[0] + index}>
            <Card
              className="mb-3"
              style={{ backgroundColor: statItem[1].color, color: "#ffffff" }}
            >
              <p>
                <b>Category:</b> {statItem[0]}
              </p>
              <p>
                <b>Time:</b> {convertMinToReadable(statItem[1].total)}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DetailStat;
