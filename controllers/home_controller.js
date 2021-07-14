//export
module.exports.home = function(req, res) {
    return res.render('home', {
        title: "Home"
    });
}

/*
module.exports.home2 = function(req, res){
    return res.end('<h1> I am the Flash,the fastest man alive </h1>');
}
*/