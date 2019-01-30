import { createServer } from "http";
import { parse } from "url";
const next = require("next");
import { $log } from "ts-log-debug";

import { routes } from "./routes";

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer((req: any, res: any) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(port, (err: any) => {
    if (err) {
      throw err;
    }
    $log.debug(`> Ready on http://localhost:${port}`);
  });
});
