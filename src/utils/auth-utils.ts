import { UserRes } from "../interfaces/user-res-interface";
import { LoginReq } from "../interfaces/login-req-interface";
import { SignupReq } from "../interfaces/signup-req-interface";

export const calculateRemainingTime = (
  expirationTime: UserRes["standardClaims"]["exp"]
) => {
  const currentTime = new Date().getTime();
  const tokenExpiration = Number(expirationTime);
  const remainingExpTime = tokenExpiration - currentTime;
  return remainingExpTime;
};

export const saveAuthData = (userRes: UserRes) => {
  localStorage.setItem("access_token", userRes.access_token);
  localStorage.setItem("exp", userRes.standardClaims.exp.toString());
  localStorage.setItem("sub", userRes.standardClaims.sub);
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

export const loginAsyncReq = async (
  loginReq: LoginReq
): Promise<UserRes | null> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email: loginReq.email,
          password: loginReq.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const json = (await response.json()) as UserRes;
      saveAuthData(json);
      return json;
    }
    return null;
  } catch (error) {
    throw new Error("Error happened");
  }
};

export const signupAsyncReq = async (
  signupReq: SignupReq
): Promise<UserRes | null> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_END_URL}/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify({
          name: signupReq.name,
          email: signupReq.email,
          password: signupReq.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const json = (await response.json()) as UserRes;
      saveAuthData(json);
      return json;
    }
    return null;
  } catch (error) {
    throw new Error("Error happened");
  }
};
