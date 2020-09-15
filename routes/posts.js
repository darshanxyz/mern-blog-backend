const express = require('express');
const Post = require('../models/Post');

// Router object
const router = express.Router();

// POST request
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    createdAt: req.body.createdAt,
    author: req.body.author
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

// GET request (all the objects)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// GET request (specific object)
router.get('/:postId', async (req, res) => {
  try {
    const posts = await Post.findById(req.params.postId);
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// DELETE request (specific object)
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

// UPDATE request (specific object)
router.patch('/:postId', async (req, res) => {
  try {
    const posts = await Post.updateOne(
      {
        _id: req.params.postId
      },
      {
        $set: {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          createdAt: req.body.createdAt,
          author: req.body.author
        }
      }
    );
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
