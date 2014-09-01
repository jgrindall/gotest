var express = require("express");
var app = express();
var port = Number(process.env.PORT || 5000);
var madge = require("madge");

app.configure(function(){
	app.use(express.static(__dirname+"/public"));
	app.use(express.basicAuth(function(user, pass) {
 		return user === 't00Simple' && pass === 't00Go';
	}));
});

app.render = function(res, path){
	res.sendfile(path);
};

app.get('/src', function(req, res) {
	app.render(res, "public/src/index.html");
});

app.get('/build', function(req, res) {
	app.render(res, "public/build/index.html");
});

app.get('/dep', function(req, res) {
	var tree, treeString, options, baseUrl, dot;
	options = {'format':'amd'};
	baseUrl = 'public/src/js/app/';
	tree = madge(baseUrl, options);
	dot = tree.dot();
	treeString = JSON.stringify(tree.tree);
	res.write("<h1>Tree</h1><p>"+treeString+"</p>");
	res.write("<h1>Dot</h1><p>"+dot+"</p>");
	res.write("<h1>Circ</h1><p>"+JSON.stringify(tree.circular())+"</p>");
	res.end();
});

app.listen(port, function() {
  console.log("Listening on " + port);
});



  

