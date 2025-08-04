const Post = require('../models/Post.js');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email bio');
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.create({
      content,
      author: req.user.id
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};