define('app/prog/dropview', ['phasercomponents'], function(PhaserComponents){

	var DropView = function(game, options){
		PhaserComponents.Drag.AbstractDropView.call(this, game, options);
	};

	DropView.prototype = Object.create(PhaserComponents.Drag.AbstractDropView.prototype);
	DropView.prototype.constructor = DropView;

	DropView.prototype.highlight = function(show){
		var scale = 1;
		if(show){
			scale = 1.2;
		}
		this.sprite.scale = {'x':scale, 'y':scale};
	};

	DropView.prototype.create = function(show){
		this.sprite = new Phaser.Sprite(this.game, this.options.bounds.x, this.options.bounds.y, 'turtle');
	};

	return DropView;
});

