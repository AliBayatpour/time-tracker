import React, { useEffect, useState, useCallback } from "react";
import { authResInterface } from "../interfaces/auth-res-interface";

interface AuthContextInterface {
  accessToken: authResInterface["access_token"] | null;
  isLoggedIn: boolean;
  login: (token: authResInterface) => void;
  logout: () => void;
}

let logoutTimer: ReturnType<typeof setTimeout> | undefined;

const AuthContext = React.createContext<AuthContextInterface>({
  accessToken: "",
  isLoggedIn: false,
  login: (token: authResInterface) => {},
  logout: () => {},
});

const calculateRemainingTime = (
  expirationTime: authResInterface["standardClaims"]["exp"]
) => {
  const currentTime = new Date().getTime();
  const tokenExpiration = Number(expirationTime);
  const remainingExpTime = tokenExpiration - currentTime;
  return remainingExpTime;
};

const saveAuthData = (authRes: authResInterface) => {
  localStorage.setItem("access_token", authRes.access_token);
  localStorage.setItem("exp", authRes.standardClaims.exp.toString());
  localStorage.setItem("sub", authRes.standardClaims.sub);
};

const clearAuthData = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("exp");
  localStorage.removeItem("sub");
};
const getAuthData = (): {
  accessToken: string;
  remainingTime: number;
} | null => {
  const accessToken = localStorage.getItem("access_token");
  const expTime = localStorage.getItem("exp");
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

export const AuthContextProvider = (props: any): any => {
  const tokenData = getAuthData();
  let initialToken = null;
  if (tokenData?.accessToken) {
    initialToken = tokenData.accessToken;
  }
  const [accessToken, setAccessToken] = useState<string | null>(initialToken);
  const userIsLoggedIn = !!accessToken;

  const loginHandler = (token: authResInterface) => {
    setAccessToken(token.access_token);
    saveAuthData(token);
    const remainingTime = calculateRemainingTime(token.standardClaims.exp);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  const logoutHandler = useCallback(() => {
    setAccessToken(null);
    clearAuthData();
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);
  useEffect(() => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    accessToken: accessToken,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
