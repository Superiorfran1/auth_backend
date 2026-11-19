import cors from "cors";
import express from "express";
import path from "node:path";
import authRouter from "./routes/auth.ts";

const app = express();

app.use(express.static(path.resolve(import.meta.dirname, "..", "public")));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

export default app;
