const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
//const Comment = require("../models/comment");

blogsRouter.get("/", async (request, response) => {
  const MyBlog = await Blog.find().populate("comments"); //refactor using async/await
  response.json(MyBlog);
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });
});

blogsRouter.get("/:id", async (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//     return authorization.substring(7);
//   }
//   return null;
// };

blogsRouter.post("/", async (request, response, next) => {
  //console.log(body.userId);
  try {
    const body = request.body;
    // const token = getTokenFrom(request);
    // console.log(token);
    // const decodedToken = jwt.verify(token, process.env.SECRET);
    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: "token missing or invalid" });
    // }
    // const user = await User.findById(decodedToken.id);
    //const user = await User.findById(body.userId);

    //for checking if like is not given
    if (body.likes === undefined) {
      body.likes = 0;
    }

    //for checking if title and url missing
    if (!(body.title || body.url)) {
      response.status(400).json({ error: "missing property" });
    } else {
      const token = request.token;
      //console.log(token);
      const decodedToken = jwt.verify(token, process.env.SECRET);
      //console.log(decodedToken, "i am decoded token");
      if (!decodedToken.id) {
        response.status(401).json({ error: "token missing or invalid" });
      }

      const user = await User.findById(decodedToken.id);
      //console.log(user, "i am user blog");

      if (!user) {
        response.status(401).json({ error: "token missing or invalid" });
      }

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
      });
      const newBlog = await blog.save(); //refactor using async/await,try,catch
      user.blogs = user.blogs.concat(newBlog._id);
      //console.log(user.blogs);
      await user.save();
      // console.log(newBlog, "newblog");
      // let sendResp = {
      //   title: newBlog.title,
      //   id: newBlog.id,
      //   author: newBlog.author,
      //   url: newBlog.url,
      //   likes: newBlog.likes,
      //   user: { username: user.username, name: user.name, id: user.id },
      // };

      response.status(201).json(newBlog);
    }
  } catch (error) {
    next(error);
  }

  // blog
  //   .save()
  //   .then((savedblog) => {
  //     response.json(savedblog);
  //   })
  //   .catch((error) => next(error));
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = request.user;
    const blogId = request.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({ error: "this id does not exist" });
    }

    //console.log(blog.user.toString(), "112");
    //console.log(user.id.toString(), "113");

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(blogId);
      //await Blog.findByIdAndRemove(request.params.id);
      response.status(204).json({ message: "deleted successfully" }).end();
    } else {
      console.log("unsucessful deletion");
    }
  } catch (err) {
    next(err);
  }

  // .then(() => {
  //   response.status(204).end();
  // })
  // .catch((error) => next(error));
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;

    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      response.status(404).json({ error: "this id does not exist" });
    }
    const updateBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      newBlog,
      {
        new: true,
      }
    );
    response.status(200).json(updateBlog);
    // Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    //   .then((updatedBlog) => {
    //     response.json(updatedBlog);
    //   })
    //   .catch((error) => next(error));
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
