const express = require('express');

const {
  logger,
  validateUserId,
  validateUser,
  validatePost
} = require('./middleware/middleware.js');
const postsRouter = require('./posts/posts-router.js');
const usersRouter = require('./users/users-router.js');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(logger);
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);
// global middlewares and routes need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
