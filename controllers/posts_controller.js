const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

//! create post
module.exports.create = async (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.redirect("/users/sign-in");
  // }

  console.log(req.body);

  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    return res.redirect("back");
  } catch (err) {
    console.group("Error", err);
    return;
  }
};

//! delete post (with comments)
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
      // .id means coverting the object id into string(automatically done by mongoose)
      if (post.user == req.user.id) {
        post.remove();

        await Comment.deleteMany({ post: req.params.id });

        return res.redirect("back");
      } else {
        return res.redirect("back");
      }
    
  } catch (err) {
    console.group("Error", err);
    return;
  }
}
