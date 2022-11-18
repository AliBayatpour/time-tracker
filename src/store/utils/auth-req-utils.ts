import { LoginReq } from "../../interfaces/login-req-interface";
import { SignupReq } from "../../interfaces/signup-req-interface";
import { UserRes } from "../../interfaces/user-res-interface";
import { saveAuthData } from "../../utils/token-utils";

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
