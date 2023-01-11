import { useEffect, useState } from "react";
import { convertMinToReadable } from "../../../utils/date.utils";
import { Timelapse } from "@mui/icons-material";
import { Chip, Tooltip } from "@mui/material";

const DELAY_KEY = "delay";

const DelayTimer: React.FC = () => {
  const removeDelay = () => {
    return localStorage.removeItem(DELAY_KEY);
  };

  const getDelay = () => {
    return localStorage.getItem(DELAY_KEY);
  };

  const storeDelay = (delayTime: number) => {
    localStorage.setItem(DELAY_KEY, delayTime.toString());
  };

  const [delay, setDelay] = useState<number>(
    (getDelay() && Number(getDelay())) || 0
  );

  useEffect(() => {
    storeDelay(delay);
  }, [delay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDelay((prevDelay) => prevDelay + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      removeDelay();
    };
  }, []);

  return (
    <div className="row mb-3">
      <div className="col-12">
        <div className="d-flex justify-content-center">
          <Tooltip title="Delay">
            <Chip
              color="secondary"
              icon={<Timelapse />}
              label={convertMinToReadable(delay / 60)}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default DelayTimer;
