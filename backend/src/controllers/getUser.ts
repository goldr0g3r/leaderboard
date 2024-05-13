import userModel from "../model/User";

export default async function getUser(ntid: string) {
  try {
    const user = await userModel.findOne({ ntid });
    return user;
  } catch (error) {
    return false;
  }
}
