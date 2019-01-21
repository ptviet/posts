import { $log } from "ts-log-debug";
import dotenv from "dotenv";
import mongoose from "mongoose";
import createServer from "./createServer";

dotenv.config({ path: "variables.env" });

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => $log.debug("MongoDB: Connected"))
  .catch(error => $log.debug(`MongoDB Error: ${error}`));

const server = createServer();
const PORT = process.env.PORT || 5000;

server.listen(PORT).then(({ url }) => $log.debug(`Server running on ${url}`));
