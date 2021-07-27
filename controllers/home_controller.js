//export
const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");

module.exports.home = function (req, res) {
  //console.log(req.cookies);
  //res.cookie('user_id', 25);

  /*
  Post.find({}, function (error, posts) {
    if (error) {
      console.log("error in fetching posts from db");
      return;
    }

    return res.render("home", {
      title: "Home",
      user_posts: posts,
    });
  });
*/

  //populate the user of each post
  Post.find({})
    .populate("user")
    .exec(function (error, posts) {
      return res.render("home", {
        title: "Ghost | Home",
        user_posts: posts,
      });
    });
};

/*
module.exports.home2 = function(req, res){
    return res.end('<h1> I am the Flash,the fastest man alive </h1>');
}
*/
