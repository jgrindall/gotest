define(['jquery', 'app/scenemanager/scenemanager', 'app/game'],

function($, SceneManager, Game) {
	
	"use strict";
	
   	var Boot = function ( ){

    };
	
	Boot.launch = function(){
		var config, sceneManager;
		sceneManager = new SceneManager();
		config = {
			"create":$.proxy(sceneManager.create, sceneManager),
			"preload":$.proxy(sceneManager.preload, sceneManager)
		};
		Game.init(config);
	};
	
	Boot.resize = function(){
		console.log("resize");
	};
	
	Boot.start = function(){
		$(window).resize($.proxy(Boot.resize, this));
		$(document).ready(Boot.launch);
	};
	
	return Boot;
	
});



