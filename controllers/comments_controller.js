const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require("../models/post");

//! create comment
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();

      req.flash('success', 'Comments added!');
      res.redirect("/");
    }
  } catch (err) {
    req.flash('error', err)
    //console.log("Error", err);
    return;
  }
};

//! delete comments
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();

      let post = Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      req.flash('success', 'Comment deleted!');
      return res.redirect("back");
    } else {
      req.flash('error', 'You cannot delete this comment!')
      return res.redirect("back");
    }
  } catch (err) {
    console.group("Error", err);
    return;
  }
}; 
