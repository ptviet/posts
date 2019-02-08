import { createServer } from 'http';
// import bodyParser from 'body-parser';
// import express from 'express';
// import cors from 'cors';
import { parse } from 'url';
import next from 'next';
import { $log } from 'ts-log-debug';
import routes from './routes';

// @ts-ignore
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);
// const handler = app.getRequestHandler();
// const jsonParser = bodyParser.json();

const startServer = () => {
  // const server = createServer(handler);
  const server = createServer((req: any, res: any) => {
    // jsonParser(req, res, () => {
    try {
      const parsedUrl = parse(req.url, true);
      handler(req, res, parsedUrl);
    } catch (err) {
      $log.debug(err);
    }

    // });
  });

  server.listen(port, (err: any) => {
    if (err) {
      throw err;
    }
    $log.debug(`> Ready on http://localhost:${port}`);
  });
};

const startApp = () => {
  app.prepare().then(() => startServer());
};

startApp();
