export type UserRes = {
  access_token: string;
  standardClaims: {
    exp: number;
    jti: string;
    iat: number;
    sub: string;
  };
};
