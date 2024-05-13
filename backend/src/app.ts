import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/mongodb";
import helmet from "helmet";
import morgan from "morgan";

const app: Express = express();

connectDB();

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

export default app;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/dashboard", (req: Request, res: Response) => {
  res.send("Dashboard Page");
});
