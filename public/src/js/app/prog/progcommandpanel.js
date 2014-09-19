define(

	['phasercomponents', 'app/views/buttons/dragbutton', 

	'app/prog/views/dragview', 'app/prog/accepter', 'app/consts/commandpaneltypes',

	'app/views/commandpanels/abstractcommandspanel', 'app/views/buttons/closebutton',

	'app/views/buttons/playbutton', 'app/prog/controller/progcontrollerfactory', 'app/prog/controller/playcontrollerfactory',

	'app/prog/targets/targetfactory', 'app/models/modelfacade', 'app/consts/playingstate'],

	function(PhaserComponents, DragButton,

		DragView, Accepter, CommandPanelTypes, 

		AbstractCommandsPanel, CloseButton,

		PlayButton, ProgControllerFactory, PlayControllerFactory,

		TargetFactory, ModelFacade, PlayingState){
	
	"use strict";

	var ProgCommandPanel = function(options){
		this.buttons = [];
		this.targets = [];
		AbstractCommandsPanel.call(this, options);
		ModelFacade.getInstance().get(ModelFacade.COMMTICKER).changeSignal.add(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.COMM).changeSignal.add(this.setProgress, this);
		ModelFacade.getInstance().get(ModelFacade.PLAYING).changeSignal.add(this.playingChanged, this);
	};

	PhaserComponents.Utils.extends(ProgCommandPanel, AbstractCommandsPanel);

	ProgCommandPanel.prototype.setProgress = function(){
		
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
		if(this.playButton.mouseUpSignal.has(this.clickPlay, this)){
			this.playButton.mouseUpSignal.remove(this.clickPlay, this);
		}	
	};
	
	ProgCommandPanel.prototype.enableStart = function(){
		if(!this.playButton.mouseUpSignal.has(this.clickPlay, this)){
			this.playButton.mouseUpSignal.add(this.clickPlay, this);
		}
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
		var drag = new DragView({"type":type, "turn":turn, "index":index, 'bounds':bounds});
		this.group.add(drag.view);
		this.dragManager.addDrag(drag);
		return drag;
	};

	ProgCommandPanel.prototype.getButtonPos = function(i, j){
		return {'x':this.bounds.x + 10 + 32*i, 'y':this.bounds.y + 10 + 40*j};
	};

	ProgCommandPanel.prototype.addButtons = function(){
		var i, j, button, buttons, bounds, data, options;
		buttons = this.options.buttons;
		for(i = 0; i < buttons.length; i++){
			for(j = 0; j < buttons[i].length; j++){
				data = buttons[i][j];
				bounds = this.getButtonPos(i, j);
				options = {'type':i, 'index':data.num, 'turn':data.turn, 'bounds':bounds};
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

	ProgCommandPanel.prototype.load = function(){
		var json, i, j, obj, drag, numTargets;
		this.dragManager.clear();
		json = ModelFacade.getInstance().get(ModelFacade.PROG).get();
		numTargets = Math.min(json.length, this.targets.length);
		for(i = 0; i < numTargets; i++){
			for(j = 0; j < json[i].length; j++){
				obj = json[i][j];
				if(obj.type !== null && obj.type !== undefined){					
					drag = this.addDrag(obj.type, obj.index, false, {'x':0, 'y':0});
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
		this.targetObj = TargetFactory.make(this.options.targets, this);
		this.targetObj.build();
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
		var options = {"bounds":{'x':this.bounds.x + (this.bounds.w - PlayButton.WIDTH)/2, 'y':this.bounds.y + 10, 'w':PlayButton.WIDTH, 'h':PlayButton.HEIGHT}};
		this.playButton = new PlayButton(options);
		this.group.add(this.playButton.view);
	};

	ProgCommandPanel.prototype.addClear = function() {
		var options = {"bounds":{'x':this.bounds.x + 100 + (this.bounds.w - PlayButton.WIDTH)/2, 'y':this.bounds.y + 10, 'w':PlayButton.WIDTH, 'h':PlayButton.HEIGHT}};
		this.clearButton = new CloseButton(options);
		this.clearButton.view.scale = {'x':0.5, 'y':0.5};
		this.group.add(this.clearButton.view);
		this.enableClear();
	};

	ProgCommandPanel.prototype.clickClear = function() {
		this.dragManager.clear();
	};

	ProgCommandPanel.prototype.clickPlay = function() {
		var commands = this.progController.getAllCommands();
		this.playController.addCommands(commands);
	};
	
	ProgCommandPanel.prototype.create = function() {
		AbstractCommandsPanel.prototype.create.call(this);
		this.model = new PhaserComponents.Drag.DragModel();
		this.dragManager = new PhaserComponents.Drag.DragManager(this.game, {"model":this.model, "fail":PhaserComponents.Drag.DragFailTypes.FAIL_REMOVE});
		this.dragManager.editSignal.add(this.onEdited, this);
		this.addButtons();
		this.addTargets();
		this.addProgController();
		this.addPlayController();
		this.addPlay();
		this.addClear();
		this.initDrag();
		this.load();
	};

	ProgCommandPanel.prototype.onEdited = function() {
		ModelFacade.getInstance().get(ModelFacade.PROG).set(this.model.toJson());
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
			if(this.isFull(hitZoneRow)){
				return true;
			}
		}
		return false;
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
		this.targetObj.destroy();
		this.targetObj = null;
		//TODO - more
		this.group.remove(this.playButton.view);
		this.group.remove(this.clearButton.view);
		this.removeTargets();
		this.removeButtons();
		AbstractCommandsPanel.prototype.destroy.call(this);
	};

	return ProgCommandPanel;
});



