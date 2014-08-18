define(['jquery', 'app/scenemanager/scenemanager', 'app/game'],

function($, SceneManager, Game) {
	
	"use strict";
	
   	var Boot = function ( ){

    };
	
	Boot.prototype.launch = function(){
		var config = {
			"create":$.proxy(this.create, this),
			"preload":$.proxy(this.preload, this)
		};
		this.sceneManager = new SceneManager();
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
		$(window).resize($.proxy(this.resize, this));
		$(document).ready($.proxy(this.launch, this));
	};
	
	return Boot;
	
});



