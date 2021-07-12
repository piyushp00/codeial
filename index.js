const express = require('express');
const app = express();
const port = 8000;


//use express router to route all requests to router
app.use('/', require('./routes')) //by default it fetches index.js in routes.

app.listen(port, function(err){
    if(err){
        //console.log('Error: ', err);
        //instead of writing as above we can use interpolation using backticks
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Express Server is running on port: ${port}`);
});

