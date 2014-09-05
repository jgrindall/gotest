
define('app/components/buttons/multibutton',['phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var MultiButton = function(options){
		PhaserComponents.View.call(this);
		this.options = options;
		this.model = this.options.model;
		this.options.model.changeSignal.add(this.onChanged, this);
		this.create();
		this.init();
		
	};

	MultiButton.prototype = Object.create(PhaserComponents.View.prototype);
	MultiButton.prototype.constructor = MultiButton;

	MultiButton.prototype.init = function(){
		var index = this.model.getData().index;
		if(index !== null){
			this.goToFrame(index);
		}
	};

	MultiButton.prototype.onChanged = function(data){
		this.goToFrame(data.index);
	};

	MultiButton.prototype.goToFrame = function(i){
		this.sprite.animations.play('frame'+i);
	};
	
	MultiButton.prototype.enableInput = function(){
		this.sprite.enableInput();
	};
	
	MultiButton.prototype.disableInput = function(){
		this.sprite.disableInput();
	};
	
	MultiButton.prototype.create = function(){
		var i;
		this.sprite = new PhaserComponents.InteractiveSprite(this.game, this.options.bounds.x, this.options.bounds.y, this.options.asset);
		for(i = 0; i<= this.options.num - 1; i++){
			this.sprite.animations.add('frame'+i, [i], 500, true);	
		}
		this.sprite.mouseUpSignal.add(this.mouseUp, this);
		this.enableInput();
	};

	MultiButton.prototype.mouseUp = function(data){
		var p, frame;
		p = data.localPoint.x / this.options.bounds.w;
		frame = Math.floor(this.options.num * p);
		this.model.setData(frame);
	};
	
	MultiButton.prototype.destroy = function(){
		this.disableInput();
		this.model.changeSignal.remove(this.onChanged, this);
		this.model = null;
		this.sprite.destroy(true);
		PhaserComponents.View.prototype.destroy.call(this);
	};

	return MultiButton;

});


