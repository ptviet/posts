import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { $log } from "ts-log-debug";
import dotenv from "dotenv";
import createServer from "./createServer";
import User from "./models/User";

dotenv.config({ path: "variables.env" });

mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => $log.debug("MongoDB: Connected"))
  .catch(error => $log.debug(`MongoDB Error: ${error}`));

const server = createServer();

// Use Express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// Decode the JWT to get userId on each request
server.express.use((req, res, next) => {
  const { POSTS__TOKEN_ } = req.cookies;
  if (POSTS__TOKEN_) {
    // @ts-ignore
    const { userId } = jwt.verify(POSTS__TOKEN_, process.env.APP_SECRET);
    // Put the userId onto the req for future requests to access
    // @ts-ignore
    req.userId = userId;
  }
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

// Use Express middleware to populate current user
server.express.use(async (req, res, next) => {
  // Skip if not logged in
  // @ts-ignore
  if (!req.userId) {
    return next();
  }

  // @ts-ignore
  const user = await User.findById(req.userId);
  // @ts-ignore
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    },
    port: process.env.PORT || 40001
  },
  deets => {
    $log.debug(`Server is now running on: http://localhost:${deets.port}`);
  }
);
