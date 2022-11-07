import jwt from "jsonwebtoken";
import { updateOneAdminUser } from "../models/adminUser/AdminUserModel.js";
import { insertSession } from "../models/session/SessionModel.js";

//to store accessJWT token in session table
export const singAccessJWT = async (payload) => {
  const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const obj = {
    token: accessJWT,
    type: "jwt",
  };
  await insertSession(obj);
  return accessJWT;
};

//to store refreshJWT token in the user table
export const singRefreshJWT = async (payload) => {
  const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "15m",
  });

  await updateOneAdminUser(payload, { refreshJWT });
  return refreshJWT;
};

//putting both token at one place to made a call from router
export const createJWTs = async (payload) => {
  return {
    accessJWT: await singAccessJWT(payload),
    refreshJWT: await singRefreshJWT(payload),
  };
};
