const User = require('../models/user');
const passport = require("passport");

//! render the profile page
module.exports.profile = function(req, res){

    User.findById(req.params.id, (error, user) => {
        res.render('users_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}


//! update the user's data
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, (error, user) => {
            return res.redirect('back');
        });
    } else {
        return res.status(401).send('Unauthorized');
    }
}


//! render the sign up page
module.exports.signUp = function(req, res){
    
    //if user already authenticated, don't show sign up page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('user_sign_up', {
        title: 'Sign Up | Ghost'
    });
}


//! render the sign in page
module.exports.signIn = function(req, res){

    //if user already authenticated, don't show sign up page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    res.render('user_sign_in', {
        title: 'Sign In | Ghost'
    });
}


//! get the sign up data
module.exports.create = function(req, res){
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(error, user){
        if(error){console.log('error in finding user in signing up'); return;}

        if(!user){
            User.create(req.body, function(error, user){
                if(error){console.log('error in creating user while signing up'); return;}

                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
}


//! sign in and create a session
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully')
    return res.redirect('/');
}


//! sign out and delete session
module.exports.deleteSession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out');
    return res.redirect('/');
}
