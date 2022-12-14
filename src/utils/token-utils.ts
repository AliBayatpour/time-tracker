import { UserRes } from "../interfaces/userResInterface";
import { momentTz } from "./date.utils";

export const calculateRemainingTime = (expirationTime: UserRes["exp"]) => {
  const currentTime = momentTz().valueOf();
  const tokenExpiration = Number(expirationTime);
  const remainingExpTime = tokenExpiration - currentTime;
  return remainingExpTime;
};

export const saveAuthData = (userRes: UserRes) => {
  localStorage.setItem("access_token", userRes.access_token);
  localStorage.setItem("exp", userRes.exp.toString());
  localStorage.setItem("sub", userRes.sub);
  localStorage.setItem("timezone", userRes.timezone);
};

export const getTimezone = () => {
  return (
    localStorage.getItem("timezone") ||
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
};

export const clearAuthData = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("exp");
  localStorage.removeItem("sub");
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

const getExpirationTime = (): string | null => {
  return localStorage.getItem("exp");
};

export const getAuthData = (): {
  accessToken: string;
  remainingTime: number;
} | null => {
  const accessToken = getAccessToken();
  const expTime = getExpirationTime();
  if (!accessToken) {
    return null;
  }
  const remainingTime = calculateRemainingTime(Number(expTime));
  if (expTime && remainingTime > 0) {
    return {
      accessToken,
      remainingTime,
    };
  }
  return null;
};
