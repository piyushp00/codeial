const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");

module.exports.create = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/users/sign-in");
  }

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
