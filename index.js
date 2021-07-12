const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

app.listen(port, function(err){
    if(err){
        //console.log('Error: ', err);
        //insted of writing as above we can use interpolation using backticks
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Express Server is running on port: ${port}`);
});

