import { $log } from "ts-log-debug";
import dotenv from "dotenv";
import mongoose from "mongoose";
import createServer from "./createServer";

dotenv.config({ path: "variables.env" });

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => $log.debug("MongoDB: Connected"))
  .catch(error => $log.debug(`MongoDB Error: ${error}`));

const server = createServer();
const PORT = process.env.PORT || 4000;

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    $log.debug(`Server is now running on: http://localhost:${deets.port}`);
  }
);
