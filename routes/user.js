
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.set({'Content-Type': "application/javascript"});
  res.json({foo: "bar", baz: "bing"});
};