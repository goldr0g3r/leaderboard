import { Request, Response, Router } from "express";
import { IUser } from "./interfaces/IUser";
import IApiResponse from "./interfaces/IApiResponse";
import createUser from "./controllers/createUser";
import getUser from "./controllers/getUser";
import getLeaderboard from "./controllers/getLeaderboard";
const router = Router();

router.post(
  "/user/create",
  async (req, res): Promise<Response<IApiResponse<IUser>>> => {
    const body: IUser = req.body;

    if (!body.ntid || !body.department || !body.name)
      return res.json({
        status: false,
        message: "Some of the required data are missing",
      });

    const response = await createUser(body.ntid, body.name, body.department);
    if (!response)
      return res.json({
        status: false,
        message: "Failed to create user",
      });

    return res.json({
      status: true,
      message: "User created successfully",
      data: response,
    });
  }
);

router.get(
  "/user/get/:ntid",
  async (req, res): Promise<Response<IApiResponse<IUser>>> => {
    const ntid = req.params.ntid;

    if (!ntid)
      return res.json({
        status: false,
        message: "NTID is required",
      });

    const response = await getUser(ntid);

    return res.json({
      status: true,
      message: "User found",
      data: response,
    });
  }
);

router.get("/leaderboard", async (req, res) => {
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
});

export default router;
