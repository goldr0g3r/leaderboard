import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/mongodb";
import helmet from "helmet";
import morgan from "morgan";
import router from "./router";

const app: Express = express();

connectDB();

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

export default app;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api", router);

app.use((request, response) => {
  return response
    .status(404)
    .send(
      "Requested route not found. Please refer to the API documentation for more information."
    );
});
