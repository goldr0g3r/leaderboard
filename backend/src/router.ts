import { Request, Response, Router } from "express";
import IApiResponse from "./interfaces/IApiResponse";
import getLeaderboard from "./controllers/getLeaderboard";
import ILeaderboard from "./interfaces/ILeaderboard";
import login from "./controllers/login";
const router = Router();

router.get(
  "/leaderboard",
  async (req, res): Promise<Response<IApiResponse<ILeaderboard>>> => {
    const response = await getLeaderboard();
    if (!response)
      return res.json({
        status: false,
        message: "Failed to get leaderboard",
      });

    return res.json({
      status: true,
      message: "Leaderboard found",
      data: response,
    });
  }
);

router.post(
  "/login",
  async (
    req: Request,
    res: Response
  ): Promise<Response<IApiResponse<string>>> => {
    try {
      const { username, password } = req.body;
      const token = await login(username, password);
      if (!token)
        return res.json({
          status: false,
          message: "Failed to login",
        });

      return res.json({
        status: true,
        message: "Login successful",
        data: token,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: "Failed to login",
      });
    }
  }
);

export default router;
