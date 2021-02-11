const express = require('express');
const {
  logger,
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware');

const User = require('./users-model');
const Post = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'The users could not be retrieved.'
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'The user could not be added.'
      });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  User.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'User could not be updated'
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  User.remove(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'User could not be removed.'
      })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  User.getUserPosts(req.params.id)
  .then(userPosts => {
    res.status(200).json(userPosts);
  })
  .catch(error => {
    res.status(500).json({
      message: "The user's posts could not be retrieved."
    });
  });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = {...req.body, user_id: req.params.id}
  Post.insert(postInfo)
    .then(post => {
      res.status(201).json(postInfo);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Post could not be added.'
      })
    })
});

// do not forget to export the router
module.exports = router