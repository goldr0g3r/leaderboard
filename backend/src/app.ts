import express, { Express, Request, Response } from "express";

const app: Express = express();

export default app;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/dashboard", (req: Request, res: Response) => {
  res.send("Dashboard Page");
});
