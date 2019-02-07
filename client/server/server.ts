// import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { parse } from 'url';
import next from 'next';
import { $log } from 'ts-log-debug';
// import routes from './routes';

// @ts-ignore
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
// const handler = routes.getRequestHandler(app);
const handler = app.getRequestHandler();

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
  server.post('*', cors());

  server.get('/', (req, res) => {
    const actualPage = '/';
    app.render(req, res, actualPage);
  });

  server.get('/signin', (req, res) => {
    const actualPage = '/signin';
    app.render(req, res, actualPage);
  });

  server.get('/signup', (req, res) => {
    const actualPage = '/signup';
    app.render(req, res, actualPage);
  });

  server.get('/profile', (req, res) => {
    const actualPage = '/profile';
    app.render(req, res, actualPage);
  });

  server.get('/myposts', (req, res) => {
    const actualPage = '/myposts';
    app.render(req, res, actualPage);
  });

  server.get('/posts', (req, res) => {
    const actualPage = '/posts';
    app.render(req, res, actualPage);
  });

  server.get('/post/new', (req, res) => {
    const actualPage = '/newpost';
    app.render(req, res, actualPage);
  });

  server.get('/post/:_id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { _id: req.params._id };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/category/new', (req, res) => {
    const actualPage = '/newcategory';
    app.render(req, res, actualPage);
  });

  server.get('/category/:_id', (req, res) => {
    const actualPage = '/category';
    const queryParams = { _id: req.params._id };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/user/:_id', (req, res) => {
    const actualPage = '/user';
    const queryParams = { _id: req.params._id };
    app.render(req, res, actualPage, queryParams);
  });

  server.all('*', (req, res, next) => {
    const parsedUrl = parse(req.url, true);
    if (req.path.startsWith('/graphql')) return next();

    return handler(req, res, parsedUrl);
    // return handler(req, res, parsedUrl, next);
  });

  server.listen(port, (err: any) => {
    if (err) {
      throw err;
    }
    $log.debug(`> Ready on http://localhost:${port}`);
  });
});
