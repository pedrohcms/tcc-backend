import {
  sign,
  verify,
  decode,
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from "jsonwebtoken";

/**
 * Given a string return a token using that string and the app secret
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
export function generateToken(payload: string) {
  const secret = String(process.env.APP_SECRET);

  const token = sign(
    {
      data: payload,
    },
    secret,
    {
      expiresIn: "6h",
    }
  );

  return token;
}

/**
 * Verify a token, using de APP_SECRET enviroment variable
 * 
 * @author Pedro Henrique Correa Mota da Silva
 */
export function verifyToken(
  token: string
): TokenExpiredError | JsonWebTokenError | NotBeforeError | object {
  const secret = String(process.env.APP_SECRET);

  const decoded = verify(token, secret, {
    complete: false,
  });

  return Object.values(decoded)[0];
}
