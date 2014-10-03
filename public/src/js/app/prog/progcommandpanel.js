define(

	['phasercomponents', 'app/views/buttons/dragbutton', 'app/assets',

	'app/prog/views/dragview', 'app/prog/accepter', 'app/consts/commandpaneltypes',

	'app/views/commandpanels/abstractcommandspanel', 'app/views/buttons/closebutton',

	'app/views/buttons/playbutton', 'app/views/buttons/stopbutton', 'app/events/events', 

	'app/prog/controller/progcontrollerfactory', 'app/prog/controller/playcontrollerfactory',

	'app/models/modelfacade', 'app/consts/playingstate'],

	function(PhaserComponents, DragButton, Assets,

		DragView, Accepter, CommandPanelTypes, 

		AbstractCommandsPanel, CloseButton,

		PlayButton, StopButton, Events,

		ProgControllerFactory, PlayControllerFactory,

		ModelFacade, PlayingState){
	
	"use strict";

	var ProgCommandPanel = function(options){
		this.buttons = [];
		this.targets = [];
		AbstractCommandsPanel.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).changeSignal.add(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.COMM).changeSignal.add(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.add(this.playingChanged, this);
		ModelFacade.getInstance().get(ModelFacade.PROG).changeSignal.add(this.progChanged, this);
	};

	PhaserComponents.Utils.extends(ProgCommandPanel, AbstractCommandsPanel);

	ProgCommandPanel.prototype.getBlockIndex = function(num){
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

	ProgCommandPanel.prototype.onResize = function(){
		
	};

	ProgCommandPanel.prototype.setProgress = function(){
		var num, total, start, progress, index = -1;
		num = ModelFacade.getInstance().get(ModelFacade.COMMTICKER).get();
		total = ModelFacade.getInstance().get(ModelFacade.COMM).getNum();
		start = ModelFacade.getInstance().get(ModelFacade.COMMTICKER).startNum;
		progress = num - start;
		if(num < total){
			index = this.getBlockIndex(progress);
		}
		this.color(index);
	};

	ProgCommandPanel.prototype.color = function(index){
		var i, target;
		for(i = 0; i < this.targets.length; i++){
			target = this.targets[i];
			target.color(i === index);
		}
	};

	ProgCommandPanel.prototype.getNumCommands = function(){
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

	ProgCommandPanel.prototype.progChanged = function(){
		this.load();
	};

	ProgCommandPanel.prototype.playingChanged = function(value){
		if(value === PlayingState.PLAYING){
			this.disableInput();
		}
		else if(value=== PlayingState.NOT_PLAYING){
			this.enableInput();
		}
	};

	ProgCommandPanel.prototype.clickButton = function(data){
		var type, index, drag, turn;
		type = data.target.options.type;
		index = data.target.options.index;
		turn = data.target.options.turn;
		if(this.dragManager && this.dragManager.enabled){
			drag = this.addDrag(type, index, turn, {'x':data.target.view.x, 'y':data.target.view.y});
			this.dragManager.startDrag(drag);
		}
	};

	ProgCommandPanel.prototype.disableInput = function(){
		this.dragManager.disableInput();
		this.disableStart();
		this.disableClear();
	};
	
	ProgCommandPanel.prototype.enableInput = function(){
		this.dragManager.enableInput();
		this.enableStart();
		this.enableClear();
	};

	ProgCommandPanel.prototype.disableStart = function(){
		this.playButton.disableInput();
	};
	
	ProgCommandPanel.prototype.enableStart = function(){
		this.playButton.enableInput();
	};

	ProgCommandPanel.prototype.disableClear = function(){
		if(this.clearButton.mouseUpSignal.has(this.clickClear, this)){
			this.clearButton.mouseUpSignal.remove(this.clickClear, this);
		}	
	};
	
	ProgCommandPanel.prototype.enableClear = function(){
		if(!this.clearButton.mouseUpSignal.has(this.clickClear, this)){
			this.clearButton.mouseUpSignal.add(this.clickClear, this);
		}
	};

	ProgCommandPanel.prototype.addDrag = function(type, index, turn, bounds){
		bounds = bounds || {'x':0, 'y':0};
		var drag = new DragView({"type":type, "turn":turn, "index":index, 'bounds':bounds});
		this.group.add(drag.view);
		this.dragManager.addDrag(drag);
		return drag;
	};

	ProgCommandPanel.prototype.getButtonPos = function(i, j){
		return {'x':this.bounds.x + 32*i, 'y':this.bounds.y + 10 + 40*j};
	};

	ProgCommandPanel.prototype.addButtons = function(){
		var i, j, button, buttons, bounds, data, options;
		buttons = this.options.buttons;
		for(i = 0; i < buttons.length; i++){
			for(j = 0; j < buttons[i].length; j++){
				data = buttons[i][j];
				bounds = this.getButtonPos(i, j);
				options = {'type':i, 'index':data.num, 'turn':(data.turn === true), 'bounds':bounds};
				button = new DragButton(options);
				this.buttons.push(button);
				this.group.add(button.view);
				button.mouseDownSignal.add(this.clickButton, this);
			}
		}
	};

	ProgCommandPanel.prototype.onSaveClick = function(){
		var jsonString = JSON.stringify(this.model.toJson());
		localStorage.setItem("jsonData", jsonString);
	};

	ProgCommandPanel.prototype.objAllowed = function(obj){
		var i, button;
		if(obj.type === null || obj.type === undefined || obj.index === null || obj.index === undefined){
			return false;
		}
		for(i = 0; i < this.buttons.length; i++){
			button = this.buttons[i];
			if(obj.type === button.options.type && obj.index === button.options.index){
				return button.options;
			}
		}
		return false;
	};

	ProgCommandPanel.prototype.load = function(){
		var json, i, j, obj, drag, numTargets, objAllowed;
		if(this.dragManager){
			this.dragManager.clear();
		}
		json = ModelFacade.getInstance().get(ModelFacade.PROG).get();
		numTargets = Math.min(json.length, this.targets.length);
		for(i = 0; i < numTargets; i++){
			for(j = 0; j < json[i].length; j++){
				obj = json[i][j];
				objAllowed = this.objAllowed(obj);
				if(objAllowed){
					drag = this.addDrag(objAllowed.type, objAllowed.index, objAllowed.turn);
					this.dragManager.snapTo(drag, i, j);
				}
			}
		}
		this.onEdited();
	};

	ProgCommandPanel.prototype.addProgController = function(){
		this.progController = ProgControllerFactory.make(this.options.type, this);
	};

	ProgCommandPanel.prototype.addPlayController = function(){
		this.playController = PlayControllerFactory.make(this.options.targets, this);
	};

	ProgCommandPanel.prototype.addTargets = function(){
		this.options.targetObj.build(this);
	};

	ProgCommandPanel.prototype.initDrag = function(){
		var i, j, hitZones, hitZone, hitZoneRow, h;
		hitZones = this.options.hitzones;
		for(i = 0; i < hitZones.length; i++){
			hitZone = hitZones[i];
			h = [];
			for(j = 0; j < hitZone.length; j++){
				h.push(new PhaserComponents.Drag.HitZone(new Accepter(hitZone[j].accept), hitZone[j].bounds));
			}
			hitZoneRow = new PhaserComponents.Drag.HitZoneRow(h);
			this.dragManager.addTarget(this.targets[i], hitZoneRow); 
		}
	};

	ProgCommandPanel.prototype.addPlay = function() {
		var options = {"bounds":{'x':this.bounds.x + (this.bounds.w - PlayButton.WIDTH)/2, 'y':this.bounds.y, 'w':PlayButton.WIDTH, 'h':PlayButton.HEIGHT}};
		this.playButton = new PlayButton(options);
		this.group.add(this.playButton.view);
		this.playButton.mouseUpSignal.add(this.clickPlay, this);
	};

	ProgCommandPanel.prototype.addStop = function() {
		var options, bounds;
		bounds = this.options.targetObj.constructor.STOP_POS;
		options = {"bounds":bounds};
		this.stopButton = new StopButton(options);
		this.group.add(this.stopButton.view);
		this.stopButton.mouseUpSignal.add(this.clickStop, this);
	};

	ProgCommandPanel.prototype.addClear = function() {
		var options = {"bounds":{'x':this.bounds.x + 100 + (this.bounds.w - PlayButton.WIDTH)/2, 'y':this.bounds.y + 10, 'w':PlayButton.WIDTH, 'h':PlayButton.HEIGHT}};
		this.clearButton = new CloseButton(options);
		this.clearButton.view.scale = {'x':0.5, 'y':0.5};
		this.group.add(this.clearButton.view);
		this.enableClear();
	};

	ProgCommandPanel.prototype.clickClear = function() {
		if(this.dragManager){
			this.dragManager.clear();
		}
		this.onEdited();
	};

	ProgCommandPanel.prototype.clickPlay = function() {
		var commands = this.progController.getAllCommands();
		this.playController.addCommands(commands);
	};

	ProgCommandPanel.prototype.addDomain = function() {
		this.domain = new Phaser.Sprite(this.game, -12, 0, Assets.DRAG_DOMAIN);
		this.group.add(this.domain);
	};

	ProgCommandPanel.prototype.clickStop = function() {
		this.eventDispatcher.trigger({"type":Events.STOP});
	};
	
	ProgCommandPanel.prototype.create = function() {
		AbstractCommandsPanel.prototype.create.call(this);
		this.model = new PhaserComponents.Drag.DragModel();
		this.dragManager = new PhaserComponents.Drag.DragManager(this.group, this.game, {"model":this.model, "fail":PhaserComponents.Drag.DragFailTypes.FAIL_REMOVE});
		this.dragManager.editSignal.add(this.onEdited, this);
		this.addDomain();
		this.addButtons();
		this.addTargets();
		this.addProgController();
		this.addPlayController();
		this.addPlay();
		this.addStop();
		this.addClear();
		this.initDrag();
		this.load();
	};

	ProgCommandPanel.prototype.onEdited = function() {
		if(this.model){
			ModelFacade.getInstance().get(ModelFacade.PROG).set(this.model.toJson(), {"silent":true});
		}
		var enable = this.startEnabled();
		if(enable){
			this.enableStart();
		}
		else{
			this.disableStart();
		}
	};

	ProgCommandPanel.prototype.removeTargets = function() {
		var target, i;
		for(i = 0; i < this.targets.length; i++){
			target = this.targets[i];
			this.group.remove(target.view);
			target.destroy();
		}
		this.targets = [];
	};

	ProgCommandPanel.prototype.removeButtons = function() {
		var button, i;
		for(i = 0; i < this.buttons.length; i++){
			button = this.buttons[i];
			button.mouseDownSignal.remove(this.clickButton, this);
			this.group.remove(button.view);
			button.destroy();
		}
		this.buttons = [];
	};

	ProgCommandPanel.prototype.isEmpty = function(hitZoneRow) {
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

	ProgCommandPanel.prototype.isFull = function(hitZoneRow) {
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

	ProgCommandPanel.prototype.startEnabled = function() {
		var i, hitZoneRow, json = this.model.toJson();
		for(i = 0; i < json.length; i++){
			hitZoneRow = json[i];
			if(!this.isEmpty(hitZoneRow) && !this.isFull(hitZoneRow)){
				// not empty and not full is no good!
				return false;
			}
		}
		return true;
	};

	ProgCommandPanel.prototype.destroy = function() {
		this.disableInput();
		this.model = null;
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).changeSignal.remove(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.COMM).changeSignal.remove(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.remove(this.playingChanged, this);
		this.dragManager.editSignal.remove(this.onEdited, this);
		this.dragManager.destroy();
		this.dragManager = null;
		this.options.targetObj.destroy();
		this.options = null;
		//TODO - more??
		this.group.remove(this.playButton.view);
		this.group.remove(this.clearButton.view);
		this.removeTargets();
		this.removeButtons();
		AbstractCommandsPanel.prototype.destroy.call(this);
	};

	return ProgCommandPanel;
});



