var express = require("express");
var app = express();
var port = Number(process.env.PORT || 5000);

app.configure(function(){
	app.use(express.static(__dirname+"/public"));
});

app.render = function(res, path){
	res.sendfile(path);
};

app.get('/container', function(req, res) {
	app.render(res, "public/src/container.html");
});

app.get('/src', function(req, res) {
	console.log("src");
	app.render(res, "public/src/index.html");
});

app.get('/build', function(req, res) {
	app.render(res, "public/build/index.html");
});

app.get('/test', function(req, res) {
	app.render(res, "public/test/SpecRunner.html");
});

app.get('/test2', function(req, res) {
	app.render(res, "public/test/SpecRunner2.html");
});

app.listen(port, function() {
  console.log("Listening on " + port);
});



  

