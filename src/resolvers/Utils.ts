import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "variables.env" });

export const createToken = async user => {
  const token = await jwt.sign({ userId: user._id }, process.env.APP_SECRET, {
    expiresIn: "1d"
  });
  return token;
};

export const checkAuth = context => {
  if (!context.request.userId) {
    throw new Error("Please login.");
  }
};
