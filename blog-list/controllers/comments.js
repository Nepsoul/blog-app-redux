const { request } = require("../app");
const Comment = require("../models/comment");
const commentRouter = require("express").Router();
//const Blog = require("../models/blog");

commentRouter.post("/:id/comments", async (req, res, next) => {
  const { comment } = req.body;
  try {
    const newComment = new Comment({
      comment,
      blog_id: req.params.id,
    });
    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
});

commentRouter.get("/:id/comments", async (req, res) => {
  const myComment = await Comment.find({ blog_id: req.params.id });
  res.json(myComment);
});

module.exports = commentRouter;
