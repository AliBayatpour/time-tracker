import moment, { Moment } from "moment-timezone";
import { getTimezone } from "./token-utils";

export const convertMinToReadable = (min: number) => {
  const floorMin = Math.floor(min);
  const floorHour = Math.floor(floorMin / 60);
  return `${floorHour} h, ${floorMin % 60} min`;
};

export const convertMinToMilliSec = (min: number): number => {
  return min * 60 * 1000;
};

export const momentTz = (date: string | number = ""): Moment => {
  return date ? moment.tz(date, getTimezone()) : moment.tz(getTimezone());
};

export const convertDateNumToTime = (mili: number): string => {
  const dateFormat = momentTz(mili);
  return dateFormat.format("MMM Do, h:mm a");
};
