const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

//! create post
module.exports.create = (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.redirect("/users/sign-in");
  // }

  console.log(req.body);

  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (error, posts) {
      if (error) {
        console.log("error in creating contact");
        return;
      }

      console.log("***", posts);
      return res.redirect("back");
    }
  );
};

//! delete post (with comments)
module.exports.destroy = (req, res) => {
  Post.findById(req.params.id, (error, post) => {
    // .id means coverting the object id into string(automatically done by mongoose)
    if (post.user == req.user.id) {
      post.remove();

      Comment.deleteMany({ post: req.params.id }, (error) => {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};

