const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");

module.exports.home = async function (req, res) {
  //console.log(req.cookies);
  //res.cookie('user_id', 25);

  //populate the user of each post
  let posts = await Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user"
      },
    })
    
    let users = await User.find({});

    return res.render("home", {
      title: "Ghost | Home",
      user_posts: posts,
      all_users: users
    });
}


//using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments).exec();
// posts.then()