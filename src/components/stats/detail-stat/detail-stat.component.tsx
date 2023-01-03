import {
  Category,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
} from "@mui/icons-material";

import { convertMinToReadable } from "../../../utils/date-utils";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Flag } from "@mui/icons-material";
import { ItemsReducerState } from "../../../interfaces/items-store/items-reducer-state-interface";

type Props = {
  statData: ItemsReducerState["statData"];
};

const DetailStat: React.FC<Props> = ({ statData }) => {
  const numberOfCountedDays = Object.keys(statData.stat).length;
  const averageMinPerDay =
    statData.total /
    (numberOfCountedDays - Math.floor(numberOfCountedDays / 7));

  const satisfactionIcon =
    averageMinPerDay >= 450
      ? { icon: <SentimentVerySatisfied />, text: "Very satisfied" }
      : averageMinPerDay >= 420
      ? { icon: <SentimentSatisfied />, text: "Satisfied" }
      : averageMinPerDay >= 360
      ? { icon: <SentimentNeutral />, text: "Neutral" }
      : averageMinPerDay >= 300
      ? { icon: <SentimentDissatisfied />, text: "Dissatisfied" }
      : {
          icon: <SentimentDissatisfied />,
          text: "Very dissatisfied",
        };

  return (
    <div className="p-3">
      <div className="row gap-1 mb-3">
        <div className="col-4">
          <ListItem sx={{ backgroundColor: "secondary.main" }}>
            <ListItemIcon>
              <Flag />
            </ListItemIcon>
            <ListItemText
              primary="Total:"
              secondary={convertMinToReadable(statData.total)}
            />
          </ListItem>
        </div>
        <div className="col-4">
          <ListItem sx={{ backgroundColor: "secondary.main" }}>
            <ListItemIcon>
              <Flag />
            </ListItemIcon>
            <ListItemText
              primary={`Daily average(1 rest day per week):`}
              secondary={convertMinToReadable(averageMinPerDay)}
            />
          </ListItem>
        </div>
        <div className="col-4">
          <ListItem sx={{ backgroundColor: "secondary.main" }}>
            <ListItemIcon>
              <Flag />
            </ListItemIcon>
            <ListItemText
              primary={`Satisfaction level:`}
              secondary={satisfactionIcon.text}
            />
          </ListItem>
        </div>
      </div>
      <div className="row gap-1">
        <div className="col-4">
          <List>
            {Object.entries(statData.categories).map((statItem, index) => (
              <ListItem
                key={statItem[0]}
                sx={{
                  color: statItem[1].color,
                  backgroundColor: "primary.contrastText",
                }}
              >
                <ListItemIcon>
                  <Category sx={{ color: statItem[1].color }} />
                </ListItemIcon>
                <ListItemText
                  primary={statItem[0]}
                  secondary={convertMinToReadable(statItem[1].total)}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};
export default DetailStat;
