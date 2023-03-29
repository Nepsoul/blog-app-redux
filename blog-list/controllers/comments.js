const Comment = require("../models/comment");
const commentRouter = require("express").Router();
const Blog = require("../models/blog");
// const blog = require("../models/blog");

commentRouter.post("/:id", async (req, res, next) => {
  const { comment } = req.body;
  console.log("comment frm backend", comment);
  try {
    const newComment = new Comment({
      comment,
      //   blog_id: req.params.id,
    });

    let blog = await Blog.findById({ _id: req.params.id });
    console.log("blog: ", blog);

    blog.comments.unshift(newComment.id);

    await blog.save();

    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
});

commentRouter.get("/:id", async (req, res) => {
  const myComment = await Comment.find({ blog_id: req.params.id });
  res.json(myComment);
});

commentRouter.get("/", async (req, res) => {
  const myComment = await Comment.find({});
  res.json(myComment);
});
module.exports = commentRouter;
