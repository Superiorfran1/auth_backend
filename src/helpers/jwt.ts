import jwt from "jsonwebtoken";
import { env } from "../config/env.ts";

export interface JwtPayload {
  uid: string;
  name: string;
}

export const generateJWT = (uid: string, name: string): Promise<string> => {
  const payload: JwtPayload = { uid, name };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      env.SECRET_JWT_SEED,
      { expiresIn: "24h" },
      (err, token) => {
        if (err || !token) {
          console.error(err);
          reject(err ?? new Error("No se pudo generar el JWT"));
          return;
        }
        resolve(token);
      },
    );
  });
};
