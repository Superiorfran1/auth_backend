import mongoose from "mongoose";
import { env } from "../config/env.ts";

export const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB);
    console.log("BASE DE DATOS CONECTADA");
  } catch (error) {
    console.error(error);
    throw new Error("Error al iniciar la BD");
  }
};
