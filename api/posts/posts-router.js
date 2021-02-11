const express = require('express');

const { validatePostId } = require('../middleware/middleware');
const Post = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) => {
  Post.get()
   .then(posts => {
     res.status(200).json(posts)
   })
   .catch(error => {
     console.log(error)
     res.status(500).json({
      message: 'The posts could not be retrieved.'
     })
   })
});

router.get('/:id', validatePostId, (req, res) => {

  res.status(200).json(req.post);
});

module.exports = router