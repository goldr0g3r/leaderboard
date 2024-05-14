import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/mongodb";
import helmet from "helmet";
import morgan from "morgan";
import router from "./router";
import cors from "cors";
import privateRouter from "./privateRouter";
import { verifyUser } from "./middleware";
import JwtLocalStrategy from "./auth/jwtStrategy";
import passport from "passport";

const app: Express = express();

connectDB();
JwtLocalStrategy(passport);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

export default app;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/public", router);
app.use("/api/auth", verifyUser, privateRouter);

app.use((request, response) => {
  return response
    .status(404)
    .send(
      "Requested route not found. Please refer to the API documentation for more information."
    );
});
