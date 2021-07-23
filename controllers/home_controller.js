//export
module.exports.home = function(req, res) {
    
    console.log(req.cookies);
    res.cookie('user_id', 25);

    return res.render('home', {
        title: "Home"
    });
}

/*
module.exports.home2 = function(req, res){
    return res.end('<h1> I am the Flash,the fastest man alive </h1>');
}
*/