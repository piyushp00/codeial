const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");


//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find a user and establish the identity
      User.findOne({ email: email }, function (error, user) {
        if (error) {
          console.log("Error in finding user --> Passport");

          return done(error); //this will report error to passport
        }

        if (!user || user.password != password) {
          console.log("Invalid Username/Password");

          return done(null, false); // no error but authentication is not done
        }

        return done(null, user); //authentication is done
      });
    }
  )
);


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done){
  done(null, user.id);  //store user id in encrypted formatin the cookies
});


//deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done){
  User.findById(id, function(error, user){
    if(error){
      console.log("Error in finding user --> Passport");
      return done(error);
    }

    return done(null, user);
  });
});


module.exports = passport;


