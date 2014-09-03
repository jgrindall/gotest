
define('app/components/buttons/stepperbutton',['app/game', 
	
'phasercomponents'],

function(Game, 

PhaserComponents){
	
	"use strict";
	
	var StepperButton = function(options){
		var index;
		this.options = options;
		this.model = this.options.model;
		this.model.changeSignal.add(this.onChanged, this);
		this.create();
		index = this.model.getData().index;
		if(index !== null){
			this.goToFrame(index);
		}
	};

	StepperButton.prototype.onChanged = function(data){
		this.goToFrame(data.index);
	};

	StepperButton.prototype.goToFrame = function(i){
		this.sprite.animations.play('frame'+i);
	};
	
	StepperButton.prototype.enableInput = function(){
		this.sprite.enableInput();
	};
	
	StepperButton.prototype.disableInput = function(){
		this.sprite.disableInput();
	};
	
	StepperButton.prototype.create = function(){
		var i;
		this.sprite = new PhaserComponents.InteractiveSprite(Game.getInstance(), this.options.bounds.x, this.options.bounds.y, this.options.asset);
		for(i = 0; i<= this.options.num - 1; i++){
			this.sprite.animations.add('frame'+i, [i], 0, true);	
		}
		this.sprite.mouseUpSignal.add(this.mouseUp, this);
		this.enableInput();
	};

	StepperButton.prototype.mouseUp = function(data){
		this.model.increment();
	};
	
	StepperButton.prototype.destroy = function(){
		this.disableInput();
		this.model.changeSignal.remove(this.onChanged, this);
		this.model = null;
		this.sprite.destroy(true);
		this.options = null;
	};

	return StepperButton;

});


