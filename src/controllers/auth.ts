import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { generateJWT } from "../helpers/jwt.ts";
import { User } from "../models/User.ts";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const crearUsuario = async (
  req: Request<Record<string, string>, unknown, RegisterBody>,
  res: Response,
): Promise<void> => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese email",
      });
      return;
    }

    const dbuser = new User({ name, email, password });

    const salt = bcrypt.genSaltSync(10);
    dbuser.password = bcrypt.hashSync(password.toString(), salt);

    const token = await generateJWT(dbuser.id, name);

    await dbuser.save();

    res.status(201).json({
      ok: true,
      uid: dbuser.id,
      name,
      email: dbuser.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error, consulte su admin",
    });
  }
};

export const loginUsuario = async (
  req: Request<Record<string, string>, unknown, LoginBody>,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const dbuser = await User.findOne({ email });

    if (!dbuser) {
      res.status(400).json({
        ok: false,
        msg: "El correo no existe",
      });
      return;
    }

    const validPassword = bcrypt.compareSync(password.toString(), dbuser.password);
    if (!validPassword) {
      res.status(400).json({
        ok: false,
        msg: "El password mal",
      });
      return;
    }

    const token = await generateJWT(dbuser.id, dbuser.name);

    res.json({
      ok: true,
      uid: dbuser.id,
      name: dbuser.name,
      email: dbuser.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error, consulte su admin",
    });
  }
};

export const renovarUsuario = async (req: Request, res: Response): Promise<void> => {
  const uid = req.uid;

  if (!uid) {
    res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
    return;
  }

  try {
    const dbuser = await User.findById(uid);
    const name = dbuser ? dbuser.name : (req.name ?? "");
    const token = await generateJWT(uid, name);

    res.json({
      ok: true,
      uid,
      name,
      email: dbuser ? dbuser.email : undefined,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error, consulte su admin",
    });
  }
};
