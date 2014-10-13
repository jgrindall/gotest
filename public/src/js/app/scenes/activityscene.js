
define(['jquery', 'phasercomponents', 'app/scenes/interactivescene',

'app/events/events', 

'app/views/mainview', 'app/assets', 'app/views/challenge/challengeview'],

function($, PhaserComponents, InteractiveScene, 

Events, MainView, Assets, ChallengeView){
	
	"use strict";
	
	var ActivityScene  = function(){
		InteractiveScene.call(this);
	};
	
	PhaserComponents.Utils.extends(ActivityScene, InteractiveScene);

	ActivityScene.prototype.startScene = function(){
		$("html").css("background", "#191919");
	};

	ActivityScene.prototype.addListeners = function(){
		InteractiveScene.prototype.addListeners.call(this);
		this.challengeHandler = this.addChallenge.bind(this);
		this.eventDispatcher.addListener(Events.SHOW_CHALLENGES, this.challengeHandler);
		this.showHandler = this.onShowAll.bind(this);
		this.eventDispatcher.addListener(Events.SHOW_ALL, this.showHandler);
	};

	ActivityScene.prototype.onShowAll = function(){
		this.showManager.start();
		this.eventDispatcher.trigger({"type":Events.REPLAY});
	};

	ActivityScene.prototype.addChallenge = function(){
		var options;
		options = {"sfx":Assets.SOUNDS[2]};
		this.alertManager.make(ChallengeView, options, this.onChooseChallenge.bind(this));
	};

	ActivityScene.prototype.onChooseChallenge = function(data){
		if(data.index === 0 && data.selection !== null){
			this.eventDispatcher.trigger({"type":Events.CHOOSE_CHALLENGE, "data":data});
		}
		else{
			this.onShowAll();
		}
	};

	ActivityScene.prototype.addMain = function(){
		var bounds;
		bounds = {'x':0, 'y':0, 'w':this.game.w, 'h':this.game.h};
		this.mainView = new MainView({"bounds":bounds});
		this.world.add(this.mainView.view);
	};

	ActivityScene.prototype.destroy = function(){
		this.eventDispatcher.removeListener(Events.SHOW_CHALLENGES, this.challengeHandler);
		this.eventDispatcher.removeListener(Events.SHOW_ALL, this.showHandler);
		this.challengeHandler = null;
		this.showHandler = null;
		InteractiveScene.prototype.destroy.call(this);
	};

	return ActivityScene;

});
	
	



