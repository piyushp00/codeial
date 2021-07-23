const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
 
//reading requests
app.use(express.urlencoded());

//cookie parser
app.use(cookieParser());

//static files
app.use(express.static('./assets'));

//layout
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router to route all requests to router
app.use('/', require('./routes')) //by default it fetches index.js in routes.

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        //console.log('Error: ', err);
        //instead of writing as above we can use interpolation using backticks
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Express Server is running on port: ${port}`);
});

