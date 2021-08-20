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
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if(req.xhr){
      return res.status(200).json({
        data: {
          post: post
        },
        message: "Post created!"
      }); 
    }
    
    req.flash('success', 'Post published!');
    return res.redirect("back");

  } catch (err) {
    req.flash('error', err);
    // console.group("Error", err);
    return;
  }
};

//! destroy post (with comments)
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
      // .id means coverting the object id into string(automatically done by mongoose)
      if (post.user == req.user.id) {
        post.remove();

        await Comment.deleteMany({ post: req.params.id });

        if(req.xhr){
          return res.status(200).json({
            data: {
              post_id: req.params.id
            },
            message: "Post deleted"
          });
        }

        req.flash('success', 'The post has been deleted!');
        return res.redirect("back");
      } else {
        req.flash('error', 'You cannot delete this post!')
        return res.redirect("back");
      }
    
  } catch (err) {
    req.flash('error', err)
    //console.log("Error", err);
    return res.redirect("back");
  }
}
