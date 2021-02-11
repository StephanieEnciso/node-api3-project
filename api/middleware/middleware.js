const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

function logger(req, res, next) {
  let URL = req.protocol + '://' + req.get('host') + req.originalUrl
  console.log(`A ${req.method} request was made to ${URL} on ${Date().toLocaleString()}.`);
 
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({ message: 'user not found'})
    };
  } catch (error) {
    res.status(500).json({
      message: 'The user information could not be retrieved'
    });
  };
};

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!req.body) {
    res.status(400).json({
      message: 'Missing user data'
    })
  } else if (name === '') {
    res.status(400).json({
      message: 'Missing required name field'
    })
  } else {
    next();
  };
};

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!req.body) {
    res.status(400).json({
      message: 'Missing post data'
    })
  } else if (text === '') {
    res.status(400).json({
      message: 'Missing required text field'
    })
  } else {
    next();
  };
}

async function validatePostId(req, res, next) {
  try {
    const post = await Posts.getById(req.params.id);
    if (post) {
      req.post = post
      next()
    } else {
      res.status(404).json({
        message: 'Post not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'The post information could not be retrieved.'
    });
  };
};

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  validatePostId
}