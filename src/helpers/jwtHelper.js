import jwt from "jsonwebtoken";
import { insertSession } from "../models/session/SessionModel.js";

export const singAccessJWT = async (payload) => {
  const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const obj = {
    token: accessJWT,
    type: "jwt",
  };
  await insertSession(obj);
};
