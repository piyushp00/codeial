module.exports.profile = function(req, res){
    //res.end('<h1>User Profile</h1>');
    res.render('users_profile', {
        title: 'Profile'
    });
}