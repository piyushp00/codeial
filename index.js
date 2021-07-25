//! libraries
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session"); //used for session cookie
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

//! middlewares
// reading requests
app.use(express.urlencoded());

// cookie parser
app.use(cookieParser());

// static files
app.use(express.static("./assets"));

// layout
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// create and encrypt user info in session cookie
app.use(
  session({
    name: "codeial",
    secret: "casterx", //TODO change the secret before deployment in production mode
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
    //mongo store for storing session cookies in the db
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codeial_development",
        autoRemove: "disabled",
      },
      function (error) {
        console.log(error || "connect-mongoDB setup ok");
      }
    ),
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session()); //passport also maintains session

//check session cookie present or not
app.use(passport.setAuthenticatedUser);

// use express router to route all requests to router
app.use("/", require("./routes")); //by default it fetches index.js in routes.


//! listen
app.listen(port, function (err) {
  if (err) {
    //console.log('Error: ', err);
    //instead of writing as above we can use interpolation using backticks
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Express Server is running on port: ${port}`);
});
