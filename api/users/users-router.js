const express = require('express');

const router = express.Router();

const User = require('./users-model')
const Post = require('../posts/posts-model')
const {
  validateUser,
  validateUserId
} = require('../middleware/middleware')

router.get('/', (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error retrieving all users.',
        actualError: err
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error adding the user',
        actualError: err
      })
    })
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  const { id } = req.params
  try{
    const count = await User.update(id, req.body)
    if(count === 1) {
      const updatedUser = await User.getById(id)
      res.status(201).json(updatedUser)
    } else {
      res.status(500).json({
        message: "The user could not be updated",
        actualError: err
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error trying to update user',
      actualError: err
    })
  }
});

router.delete('/:id', validateUserId, (req, res) => {
  User.remove(req.params.id)
    .then(removedUser => {
      res.status(200).json(req.user)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error deleting user',
        actualError: err
      })
    })
});

router.get('/:id/posts', (req, res) => {
 User.getUserPosts(req.params.id)
   .then(posts => {
     res.status(200).json(posts)
   })
   .catch(err => {
     res.status(500).json({
       message: "Error get the user's posts",
       actualError: err
     })
   })
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router