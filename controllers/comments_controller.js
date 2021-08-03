const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require("../models/post");


//! create comment
module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (error, post) {
    
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (error, comment) {
          if (error) {
            console.log("error in creating comment");
            return;
          }

          post.comments.push(comment);
          post.save();

          res.redirect("/");
        }
      );
    } 
  });
}


//! delete comments
module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, (error, comment) => {
    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        (error, post) => {
          return res.redirect("back");
        });
    } else {
      return res.redirect("back");
    }
  });
}