define(

	['jquery', 'phasercomponents', 'app/consts/commandpaneltypes',

	'app/views/buttons/closebutton',

	'app/views/buttons/playbutton', 'app/views/buttons/stopbutton', 'app/events/events', 

	'app/prog/controller/progcontrollerfactory',

	'app/models/modelconsts'],

	function($, PhaserComponents, CommandPanelTypes, 

		CloseButton,

		PlayButton, StopButton, Events,

		ProgControllerFactory,

		ModelConsts){
	
	"use strict";

	var ProgDragContainer = function(options){
		this.targets = [];
		this.playSignal = new Phaser.Signal();
		this.clearSignal = new Phaser.Signal();
		options.bounds = $.extend(options.bounds, {'x':0, 'w':ProgDragContainer.WIDTH});
		PhaserComponents.Display.Container.call(this, options);
		this.modelFacade.get(ModelConsts.COMMTICKER).changeSignal.add(this.setProgress, this);
		this.modelFacade.get(ModelConsts.COMM).changeSignal.add(this.setProgress, this);
		this.progController = ProgControllerFactory.make(this.options.type, this);
	};

	PhaserComponents.Utils.extends(ProgDragContainer, PhaserComponents.Display.Container);

	ProgDragContainer.WIDTH = 222;

	ProgDragContainer.prototype.addTargets = function(){
		this.options.targetObj.build(this);
	};

	ProgDragContainer.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addTargets();
		this.addPlay();
		this.addStop();
		this.addClear();
	};

	ProgDragContainer.prototype.addGfx = function(gfx){
		this.group.add(gfx);
	};

	ProgDragContainer.prototype.removeGfx = function(gfx){
		this.group.remove(gfx);
	};

	ProgDragContainer.prototype.disableInput = function() {
		this.playButton.disableInput();
		this.clearButton.disableInput();
	};

	ProgDragContainer.prototype.enableInput = function() {
		this.playButton.enableInput();
		this.clearButton.enableInput();
	};

	ProgDragContainer.prototype.addDrag = function(drag) {
		this.group.add(drag.view);
	};
		
	ProgDragContainer.prototype.addPlay = function() {
		var options, bounds, x, y;
		x = (this.bounds.x + this.bounds.w/2) + this.options.targetObj.constructor.START_POS.x;
		y = this.options.targetObj.constructor.START_POS.y;
		bounds = {'x':x, 'y':y};
		options = {"bounds":bounds};
		this.playButton = new PlayButton(options);
		this.group.add(this.playButton.view);
		this.playButton.mouseUpSignal.add(this.clickPlay, this);
	};

	ProgDragContainer.prototype.addStop = function() {
		var options, bounds, x, y;
		x = this.bounds.x + this.bounds.w/2 + this.options.targetObj.constructor.STOP_POS.x;
		y = this.options.targetObj.constructor.STOP_POS.y;
		bounds = bounds = {'x':x, 'y':y};
		options = {"bounds":bounds};
		this.stopButton = new StopButton(options);
		this.group.add(this.stopButton.view);
		this.stopButton.mouseUpSignal.add(this.clickStop, this);
	};

	ProgDragContainer.prototype.addClear = function() {
		var options, bounds;
		bounds = this.playButton.bounds;
		options = {"bounds":{'x':bounds.x + 100, 'y':bounds.y + 15}};
		this.clearButton = new CloseButton(options);
		this.clearButton.view.scale = {'x':0.5, 'y':0.5};
		this.group.add(this.clearButton.view);
		this.clearButton.mouseUpSignal.add(this.clickClear, this);
		this.clearButton.enableInput();
	};

	ProgDragContainer.prototype.addTarget = function(target) {
		this.targets.push(target);
		this.group.add(target.view);
	};

	ProgDragContainer.prototype.clickClear = function() {
		this.clearSignal.dispatch();
	};

	ProgDragContainer.prototype.getBlockIndex = function(num){
		var sum, numCommands, index = 0;
		numCommands = this.getNumCommands();
		sum = numCommands[0];
		index = 0;
		while(sum <= num){
			index = (index + 1) % numCommands.length;
			sum += numCommands[index];
		}
		return index;
	};

	ProgDragContainer.prototype.getContentHeight = function(){
		return this.options.targetObj.constructor.HEIGHT || this.bounds.h;
	};

	ProgDragContainer.prototype.isEmpty = function(hitZoneRow) {
		var hitZone0, hitZone1;
		hitZone0 = hitZoneRow[0];
		hitZone1 = hitZoneRow[1];
		if(this.options.type === CommandPanelTypes.NSEW){
			return (typeof hitZone0.type === 'undefined');
		}
		else{
			return ( (typeof hitZone0.type === 'undefined') && (typeof hitZone1.type === 'undefined'));
		}
	};

	ProgDragContainer.prototype.isFull = function(hitZoneRow) {
		var hitZone0, hitZone1;
		hitZone0 = hitZoneRow[0];
		hitZone1 = hitZoneRow[1];
		if(this.options.type === CommandPanelTypes.NSEW){
			return (typeof hitZone0.type === 'number');
		}
		else{
			return ( (typeof hitZone0.type === 'number') && (typeof hitZone1.type === 'number'));
		}
	};

	ProgDragContainer.prototype.checkStartEnabled = function() {
		var enable = this.startEnabled();
		if(enable){
			this.playButton.enableInput();
		}
		else{
			this.playButton.disableInput();
		}
	};

	ProgDragContainer.prototype.startEnabled = function() {
		var i, hitZoneRow, json = this.options.model.toJson();
		for(i = 0; i < json.length; i++){
			hitZoneRow = json[i];
			if(!this.isEmpty(hitZoneRow) && !this.isFull(hitZoneRow)){
				return false;
			}
		}
		return true;
	};

	ProgDragContainer.prototype.getNumCommands = function(){
		var i, hitZoneRow, n, numCommands, json;
		numCommands = [];
		json = this.model.toJson();
		for(i = 0; i < json.length; i++){
			n = 0;
			hitZoneRow = json[i];
			if(this.isFull(hitZoneRow)){
				n = (hitZoneRow[1] ? (hitZoneRow[1].index + 1) : 1);
			}
			numCommands.push(n);
		}
		return numCommands;
	};

	ProgDragContainer.prototype.setProgress = function(){
		var num, total, start, progress, index = -1;
		num = this.modelFacade.get(ModelConsts.COMMTICKER).get();
		total = this.modelFacade.get(ModelConsts.COMM).getNum();
		start = this.modelFacade.get(ModelConsts.COMMTICKER).startNum;
		progress = num - start;
		if(num < total){
			index = this.getBlockIndex(progress);
		}
		this.color(index);
	};


	ProgDragContainer.prototype.color = function(index){
		var i, target;
		for(i = 0; i < this.targets.length; i++){
			target = this.targets[i];
			target.color(i === index);
		}
	};

	ProgDragContainer.prototype.addLoopButton = function(b) {
		this.group.add(b);
	};

	ProgDragContainer.prototype.removeTargets = function() {
		var target, i;
		for(i = 0; i < this.targets.length; i++){
			target = this.targets[i];
			this.group.remove(target.view);
			target.destroy();
		}
		this.targets = [];
	};

	ProgDragContainer.prototype.clickPlay = function() {
		var commands = this.progController.getAllCommands();
		this.playSignal.dispatch(commands);
	};

	ProgDragContainer.prototype.clickStop = function() {
		this.eventDispatcher.trigger({"type":Events.STOP});
	};

	ProgDragContainer.prototype.destroy = function() {
		this.group.remove(this.clearButton.view);
		this.group.remove(this.stopButton.view);
		this.group.remove(this.playButton.view);
		this.playSignal.dispose();
		this.clearSignal.dispose();
		this.playSignal = null;
		this.clearSignal = null;
		this.modelFacade.get(ModelConsts.COMMTICKER).changeSignal.remove(this.setProgress, this);
		this.modelFacade.get(ModelConsts.COMM).changeSignal.remove(this.setProgress, this);
		this.playButton.mouseUpSignal.remove(this.clickPlay, this);
		this.clearButton.mouseUpSignal.remove(this.clickClear, this);
		this.stopButton.mouseUpSignal.remove(this.clickStop, this);

	};

	return ProgDragContainer;
});



