
define(['app/components/buttons/navbutton', 'app/components/buttons/closebutton', 'app/game', 'app/components/buttons/listbutton', 'app/components/buttons/homebutton', 'app/components/container'],

function(NavButton, CloseButton, Game, ListButton, HomeButton, Container){
	
	"use strict";
		
	var GameMenu = function(options){
		Container.call(this, options);
		this.selectSignal = new Phaser.Signal();
		this.buttons = [];
	};
	
	GameMenu.WIDTH = 800;
	GameMenu.HEIGHT = 600;
	
	GameMenu.prototype = Object.create(Container.prototype);
	GameMenu.prototype.constructor = GameMenu;
	
	GameMenu.prototype.addRect = function () {
		this.panel = new Phaser.Sprite(Game.getInstance(), this.bounds.x, this.bounds.y, 'panel');
		this.buttonGroup = new Phaser.Group(Game.getInstance(), 0, 0);
		this.group.add(this.panel);
		this.group.add(this.buttonGroup);
	};
	
	GameMenu.prototype.addButton = function (ClassRef, x, y) {
		var b = new ClassRef({"x":x, "y":y});
		b.create();
		b.mouseUpSignal.add(this.buttonUp, this);
		this.buttonGroup.add(b.sprite);
		this.buttons.push(b);
	};
	
	GameMenu.prototype.create = function () {
		Container.prototype.create.call(this);
		this.addRect();
		var y = this.bounds.y + this.bounds.h/2 - NavButton.HEIGHT/2;
		this.addButton(NavButton, 200, y);
		this.addButton(NavButton, 350, y);
		this.addButton(ListButton, 500, y);
		this.addButton(HomeButton, 650, y);
		this.addButton(NavButton, 750, y);
		this.addButton(CloseButton, this.bounds.x + this.bounds.w - 50, this.bounds.y + 10);
	};
	
	GameMenu.prototype.buttonUp = function(data) {
		var index = this.buttonGroup.getIndex(data.target.sprite);
		this.selectSignal.dispatch({"index":index});
	};
	
	GameMenu.prototype.destroy = function() {
		$.each(this.buttons, function(i, b){
			b.mouseUpSignal.removeAll(this);
		});
		Container.prototype.destroy.call(this);
	};
	
	GameMenu.prototype.update = function() {
    
	};
	
	return GameMenu;
	
});
	






