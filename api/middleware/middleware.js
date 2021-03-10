const User = require('../users/users-model')
const Post = require('../posts/posts-model')

function logger(req, res, next) {
  let URL = req.protocol + '://' + req.get('host') + req.originalUrl
  console.log( `A ${req.method} request was made to ${URL} on ${Date().toLocaleString()}.`)
  next()
}

async function validateUserId(req, res, next) {
  const { id } = req.params
  try{
    const user = await User.getById(id)
    if(!user) {
      res.status(404).json({
        message: "user not found"
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: `Error trying to fetch user: ${err}`
    })
  }
}

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({
      message: "missing user data"
    })
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({
      message: "missing post data"
    })
  } else if (!req.body.text) {
    res.status(400),json({
      message: " missing required text field"
    })
  } else {
    next()
  }
}

async function validatePostId(req, res, next) {
  const { id } = req.params
  try{
    const post = await Post.getById(id)
    if(!post) {
      res.status(404).json({
        message: "post not found"
      })
    } else {
      req.post = post
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: `Error trying to fetch post: ${err}`
    })
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  validatePostId
}