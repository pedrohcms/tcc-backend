import { sign } from "jsonwebtoken";

/**
 * Given a string return a token using that string and the app secret
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
export default function generateToken(payload: string) {
  const secret = String(process.env.APP_SECRET);

  payload = String(payload);

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
