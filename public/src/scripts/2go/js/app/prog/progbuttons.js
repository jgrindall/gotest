define(

	['phasercomponents', 'base/views/buttons/dragbutton', 'base/assets'],

	function(PhaserComponents, DragButton, Assets){
	
	"use strict";

	var ProgButtons = function(options){
		this.buttons = [];
		this.buttonSignal = new Phaser.Signal();
		PhaserComponents.Display.Container.call(this, options);
	};

	PhaserComponents.Utils.extends(ProgButtons, PhaserComponents.Display.Container);

	ProgButtons.WIDTH = 80;

	ProgButtons.prototype.clickButton = function(data){
		this.buttonSignal.dispatch(data);
	};

	ProgButtons.prototype.getButtonPos = function(i, j){
		return {'x':6 + this.bounds.x + 30*i, 'y':this.bounds.y + 10 + 40*j};
	};

	ProgButtons.prototype.addButtons = function(){
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

	ProgButtons.prototype.objAllowed = function(obj){
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

	ProgButtons.prototype.addDomain = function() {
		this.domain = new Phaser.Sprite(this.game, 0, 0, Assets.DRAG_DOMAIN);
		this.group.add(this.domain);
	};
	
	ProgButtons.prototype.create = function() {
		PhaserComponents.Display.Container.prototype.create.call(this);
		this.addDomain();
		this.addButtons();
	};

	ProgButtons.prototype.removeButtons = function() {
		var button, i;
		for(i = 0; i < this.buttons.length; i++){
			button = this.buttons[i];
			button.mouseDownSignal.remove(this.clickButton, this);
			this.group.remove(button.view);
			button.destroy();
		}
		this.buttons = [];
	};

	ProgButtons.prototype.destroy = function() {
		this.removeButtons();
		this.buttonSignal.dispose();
		this.buttonSignal = null;
		PhaserComponents.Display.Container.prototype.destroy.call(this);
	};

	return ProgButtons;
});



