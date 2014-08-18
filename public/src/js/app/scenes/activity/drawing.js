
define(['app/game', 'app/components/container',

'app/scenes/activity/map', 'app/scenes/activity/turtle', 'app/scenes/activity/paths',

'app/scenes/activity/commmodel'],

function(Game, Container,

Map, Turtle, Paths,

commModel){
	
	"use strict";
	
	var Drawing  = function(options){
		Container.call(this, options);
		commModel.executeSignal.add(this.commandExecute, this);
		this.create();
	};
	
	Drawing.prototype = Object.create(Container.prototype);
	Drawing.prototype.constructor = Drawing;
	
	Drawing.prototype.commandExecute = function(data){
		var command, fraction;
		command = data.command;
		fraction = data.fraction;
		console.log("c "+command+", "+fraction);
		this.paths.execute(command, fraction);
		//this.turtle.execute(command, fraction);
	};
	
	Drawing.prototype.create = function() {
		Container.prototype.create.call(this);
		this.addPaths();
		this.addTurtle();
	};
	
	Drawing.prototype.addTurtle = function() {
		var bounds = {'x':50, 'y':50, 'w':600, 'h':50};
		this.turtle = new Turtle({'bounds':bounds});
		this.group.add(this.turtle.group);
	};
	
	Drawing.prototype.addPaths = function() {
		var bounds = {'x':50, 'y':50, 'w':600, 'h':50};
		this.paths = new Paths({'bounds':bounds});
		this.group.add(this.paths.group);
	};
	
	Drawing.prototype.destroy = function() {
		Container.prototype.destroy.call(this);
		this.paths.destroy();
		this.turtle.destroy();
	};
	
	return Drawing;

});
	
