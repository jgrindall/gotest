define('app/boot/boot',['jquery', 'app/game',

	'app/scenemanager/scenemanager',

	'app/commands/commandmap'],

function($, Game, SceneManager,

	commandMap) {
	
	"use strict";
	
   	var Boot = function ( ){
   		
    	};
	
	Boot.prototype.launch = function(){
		var config = {
			"create":this.create.bind(this),
			"preload":this.preload.bind(this)
		};
		this.sceneManager = new SceneManager();
		commandMap.init();
		Game.init(config);
	};
	
	Boot.prototype.create = function(){
		this.resize();
		this.sceneManager.create();
	};
	
	Boot.prototype.preload = function(){
		this.sceneManager.preload();
	};
	
	Boot.prototype.resize = function(){
		$("#game").width(Game.w()).height(Game.h());
	};
	
	Boot.prototype.start = function(){
		$(window).resize(this.resize.bind(this));
		$(document).ready(this.launch.bind(this));
	};
	
	return Boot;
	
});


