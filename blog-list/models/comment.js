const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: String,
  //   blog_id: String,
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});
const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
