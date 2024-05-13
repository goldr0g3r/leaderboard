import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>(
  {
    ntid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    totalScore: { type: Number, default: 0 },
    individualScore: {
      type: Object,
      default: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model<IUser>("User", userSchema);

export default userModel;
