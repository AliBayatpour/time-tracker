import { convertMinToReadable } from "../../../utils/date.utils";
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StatForm } from "../../../interfaces/statForm";
import { ItemsReducerState } from "../../../interfaces/itemsStore/itemsReducerState.interface";

type Props = {
  statData: ItemsReducerState["statData"];
  statForm: StatForm;
};

const DetailStat: React.FC<Props> = ({ statData, statForm }) => {
  const numberOfCountedDays = Object.keys(statData.stat).length;
  const averageMinPerDay =
    statData.total /
    (numberOfCountedDays - Math.floor(numberOfCountedDays / 7));

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-12">
          <Typography
            color="secondary"
            variant="h6"
            component="h4"
            gutterBottom
          >
            {statForm.interval.value}
          </Typography>
          <Divider className="mb-3" />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>Total</TableCell>
                  <TableCell>{convertMinToReadable(statData.total)}</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>Daily average(1 rest day per week)</TableCell>
                  <TableCell>
                    {convertMinToReadable(averageMinPerDay)}
                  </TableCell>
                </TableRow>
                {Object.entries(statData.categories).map((statItem, index) => (
                  <TableRow hover>
                    <TableCell
                      key={statItem[0]}
                      sx={{
                        color: statItem[1].color,
                      }}
                    >
                      {statItem[0]}
                    </TableCell>
                    <TableCell>
                      {convertMinToReadable(statItem[1].total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};
export default DetailStat;
