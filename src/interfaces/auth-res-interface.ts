export interface authResInterface {
  access_token: string;
  standardClaims: {
    exp: number;
    jti: string;
    iat: number;
    sub: string;
  };
}
