var express = require("express");
var app = express();
var port = Number(process.env.PORT || 5000);

app.configure(function(){
	app.use(express.static(__dirname+"/public"));
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

app.listen(port, function() {
  console.log("Listening on " + port);
});



  

