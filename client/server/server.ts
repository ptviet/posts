// import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { parse } from 'url';
import next from 'next';
import { $log } from 'ts-log-debug';
import routes from './routes';

// @ts-ignore
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
// @ts-ignore
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  // createServer((req: any, res: any) => {
  //   const parsedUrl = parse(req.url, true);
  //   handler(req, res, parsedUrl);
  // }).listen(port, (err: any) => {
  //   if (err) {
  //     throw err;
  //   }
  //   $log.debug(`> Ready on http://localhost:${port}`);
  // });

  const server = express();
  server.use(cors());
  server.options('*', cors());

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);

    return handler(req, res, parsedUrl);
  });

  server.listen(port, (err: any) => {
    if (err) {
      throw err;
    }
    $log.debug(`> Ready on http://localhost:${port}`);
  });
});
