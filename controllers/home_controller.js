//export
module.exports.home = function(req, res, next) {
    return res.end('<h1>Express is up for Codeial!</h1>')
}

module.exports.home2 = function(req, res){
    return res.end('<h1> I am the Flash,the fastest man alive </h1>');
}