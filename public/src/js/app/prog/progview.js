define('app/prog/progview',

	['phasercomponents', 'phaser', 'app/prog/buttonview', 'app/prog/dropview',

	'app/prog/dragview', 'app/prog/accepter', 'app/assets'],

	function(PhaserComponents, Phaser, ButtonView, DropView,

		DragView, Accepter, Assets){
	
	"use strict";

	var ProgView = function(options){
		this.buttons = [];
		this.targets = [];
		PhaserComponents.Display.Container.call(this, options);
	};

	ProgView.prototype.clickButton = function(data){
		var type, index, tick;
		type = data.target.options.type
		index = data.target.options.index;
		if(this.dragManager && this.dragManager.enabled){
			tick = this.addDrag(type, index, {'x':data.target.sprite.x, 'y':data.target.sprite.y});
			this.dragManager.startDrag(tick);
		}
	};

	ProgView.prototype.addDrag = function(type, index, bounds){
		var tick = new DragView(this.game, {"type":type, "index":index, 'bounds':bounds, 'asset':Assets.SLIDERHANDLE});
		this.group.add(tick.sprite);
		this.dragManager.addDrag(tick);
		return tick;
	};

	ProgView.prototype.addButtons = function(){
		var i, j, button, buttons;
		buttons = this.options.data[0];
		for(i = 0; i < buttons.length; i++){
			for(j = 0; j < buttons[i]; j++){
				button = new ButtonView(this.game, {'type':i, 'index':j, 'bounds':{'x':10, 'y':40 + 200*i + 45*j}});
				this.buttons.push(button);
				this.group.add(button.sprite);
				button.mouseDownSignal.add(this.clickButton, this);
			}
		}
	};

	ProgView.prototype.addOutput = function(){
		this.save = new Phaser.Button(this.game, 660, 20, 'button', this.onSaveClick, this);
		this.load = new Phaser.Button(this.game, 660, 80, 'button', this.onLoadClick, this);
		this.group.add(this.save);
		this.group.add(this.load);
	};

	ProgView.prototype.onSaveClick = function(){
		var jsonString = JSON.stringify(this.model.toJson());
		localStorage.setItem("jsonData", jsonString);
	};

	ProgView.prototype.onLoadClick = function(){
		var i, j, json, jsonString, obj, tick;
		this.dragManager.clear();
		jsonString = localStorage.getItem("jsonData");
		json = JSON.parse(jsonString);
		for(i = 0; i < json.length; i++){
			for(j = 0; j < json[i].length; j++){
				obj = json[i][j];
				if(obj.type !== null && obj.type !== undefined){
					tick = this.addDrag(obj.type, obj.index);
					this.dragManager.snapTo(tick, i, j);
				}
			}
		}
	};

	ProgView.prototype.addTargets = function(){
		var i, target, numTargets;
		numTargets = this.options.data[1];
		for(i = 0; i < numTargets; i++){
			target = new DropView(this.game, {'index':i, 'bounds':{'x':250 + 50*i, 'y':70 + 40*i}});
			this.targets.push(target);
			this.group.add(target.sprite);
		}
	};

	ProgView.prototype.initDrag = function(){
		console.log("targets "+this.targets);
		var hitZoneRow0 = new PhaserComponents.Drag.HitZoneRow([new PhaserComponents.Drag.HitZone(new Accepter([0]), {'x':0, 'y':0}), new PhaserComponents.Drag.HitZone(new Accepter([1]), {'x':35, 'y':0})]);
		var hitZoneRow1 = new PhaserComponents.Drag.HitZoneRow([new PhaserComponents.Drag.HitZone(new Accepter([0]), {'x':20, 'y':0})]);
		var hitZoneRow2 = new PhaserComponents.Drag.HitZoneRow([new PhaserComponents.Drag.HitZone(new Accepter([0]), {'x':0, 'y':0}), new PhaserComponents.Drag.HitZone(new Accepter([1]), {'x':35, 'y':0})]);
		this.dragManager.addTarget(this.targets[0], hitZoneRow0); 
		this.dragManager.addTarget(this.targets[1], hitZoneRow1); 
		this.dragManager.addTarget(this.targets[2], hitZoneRow2); 
	};

	ProgView.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.model = new PhaserComponents.Drag.DragModel();
		this.dragManager = new PhaserComponents.Drag.DragManager(this.game, {"model":this.model, "fail":PhaserComponents.Drag.DragFailTypes.FAIL_REMOVE});
		this.addButtons();
		this.addTargets();
		this.initDrag();
		//this.addOutput();
	};

	return ProgView;
});

