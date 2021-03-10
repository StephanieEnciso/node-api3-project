const express = require('express');

const router = express.Router();
const { validatePostId } = require('../middleware/middleware')

const Post = require('./posts-model')

router.get('/', (req, res) => {
  Post.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
        message: 'error retrieving posts.',
        actualError: err
      })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

module.exports = router