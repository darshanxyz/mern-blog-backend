const express = require('express');
const Post = require('../models/Post');

// Router object
const router = express.Router();

// Adding a new post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    createdAt: req.body.createdAt,
    author: req.body.author,
    content: req.body.content
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

// Getting all the posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// Getting post based on post id
router.get('/:postId', async (req, res) => {
  try {
    const posts = await Post.findById(req.params.postId);
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// Searching posts based on query
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const posts = await Post.find({
      $text: {
        $search: query
      }
    });
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// Getting the post metrics for a specific user
router.post('/metrics', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.body.user.firstName });
    const metrics = {
      totalPosts: posts.length,
      totalPageViews: posts.reduce((firstPost, nextPost) => firstPost + (nextPost.pageViews || 0), 0),
      totalLikes: posts.reduce((firstPost, nextPost) => firstPost + (nextPost.likes || 0), 0),
      totalComments: posts.reduce((firstPost, nextPost) => firstPost + (nextPost.comments || 0), 0),
    }
    res.json(metrics);
  } catch (error) {
    res.json({
      message: error
    });
  }
});

// Adding comments to a post
router.patch('/comment/:postId', async (req, res) => {
  try {
    const comment = req.body;
    const post = await Post.updateOne(
      {
        _id: req.params.postId
      },
      {
        $push: {
          comments: comment
        }
      }
    );
    res.json(post);
  } catch (error) {
    res.json({
      message: error
    });
  }
});

// Getting all the comments for a post
router.get('/allComments/:postId', async (req, res) => {
  try {
    const comments = await Post.findById(req.params.postId);
    res.json(comments.comments);
  } catch (error) {
    res.json({
      message: error
    });
  }
});

// Deleting a specific post
router.delete('/:postId', async (req, res) => {
  try {
    const posts = await Post.deleteOne({
      _id: req.params.postId
    });
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// Updating a specific post
router.patch('/:postId', async (req, res) => {
  try {
    const fields = Object.keys(req.body);
    const patchObject = {}
    fields.forEach(field => {
      patchObject[field] = req.body[field]
    });
    const posts = await Post.updateOne(
      {
        _id: req.params.postId
      },
      {
        $set: patchObject
      }
    );
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
