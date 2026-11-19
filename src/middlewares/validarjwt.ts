import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.ts";
import type { JwtPayload } from "../helpers/jwt.ts";

export const validarJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("x-token");

  if (!token) {
    res.status(401).json({
      ok: false,
      msg: "Error en el token",
    });
    return;
  }

  try {
    const { uid, name } = jwt.verify(token, env.SECRET_JWT_SEED) as JwtPayload;
    req.uid = uid;
    req.name = name;
  } catch {
    res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
    return;
  }

  next();
};
