const express = require('express');

const router = express.Router();

const Post = require('./posts-model')

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
});

router.get('/:id', (req, res) => {
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
});

// do not forget to export the router
module.exports = router