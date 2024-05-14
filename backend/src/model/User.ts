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
        0: {
          score: 0,
          games: {},
        },
        1: {
          score: 0,
          games: {
            carroms: 0,
            foosball: 0,
            untangle: 0,
            rubiksCube: 0,
          },
        },
        2: {
          score: 0,
          games: {},
        },
        3: {
          score: 0,
          games: {},
        },
        4: {
          score: 0,
          games: {},
        },
        5: {
          score: 0,
          games: {},
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model<IUser>("User", userSchema);

export default userModel;
