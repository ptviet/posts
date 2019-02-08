import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import { $log } from 'ts-log-debug';
// import dotenv from 'dotenv';
import createServer from './createServer';
import User from './models/User';

// dotenv.config({ path: 'variables.env' });
require('now-env');

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => $log.debug('MongoDB: Connected'))
  .catch(error => $log.debug(`MongoDB Error: ${error}`));

const server = createServer();

// server.express.use(bodyParser.json());

// Use Express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// server.express.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', process.env.APP_SECRET);
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// Decode the JWT to get userId on each request
server.express.use(async (req, res, next) => {
  // @ts-ignore
  req.userId = '';
  if (req.cookies) {
    const { POSTS__TOKEN_ } = req.cookies;
    if (POSTS__TOKEN_) {
      // @ts-ignore
      const data = jwt.verify(POSTS__TOKEN_, process.env.APP_SECRET);
      if (data) {
        // @ts-ignore
        const { userId } = data;
        // Put the userId onto the req for future requests to access

        if (userId) {
          // @ts-ignore
          req.userId = userId;
        }
      }
    }
  }

  return next();
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

  if (user) {
    // @ts-ignore
    req.user = user;
  }

  return next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.FRONTEND_URL, 'http://localhost:3000']
    },
    port: parseInt(process.env.PORT, 10) || 40001,
    endpoint: '/',
    playground: '/playground'
  },
  deets => {
    $log.debug(`Server is now running on: http://localhost:${deets.port}`);
  }
);
