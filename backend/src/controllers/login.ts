import { sign } from "jsonwebtoken";
import environment from "../config/environment";

export default async function login(
  username: string,
  password: string
): Promise<string | false> {
  try {
    if (username === "admin" && password === "admin") {
      const token = sign({ username }, environment.accessTokenSecret, {
        expiresIn: environment.accessTokenExpiry,
      });

      return token;
    }
    return false;
  } catch (error) {
    return false;
  }
}
