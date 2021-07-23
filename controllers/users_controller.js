const User = require('../models/user');

//render the profile page
module.exports.profile = function(req, res){
    res.render('users_profile', {
        title: 'Profile'
    });
}

//render the sign up page
module.exports.signUp = function(req, res){
    res.render('user_sign_up', {
        title: 'Gravitas | Sign Up'
    });
}

//render the sign in page
module.exports.signIn = function(req, res){
    res.render('user_sign_in', {
        title: 'Gravitas | Sign In'
    });
}

//get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
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

//sign in and create a session for the users
module.exports.createSessions = function(req, res){
    //todo! later
}