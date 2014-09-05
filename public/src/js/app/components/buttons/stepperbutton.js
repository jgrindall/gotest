
define('app/components/buttons/stepperbutton',[ 
	
'phasercomponents'],

function(PhaserComponents){
	
	"use strict";
	
	var StepperButton = function(options){
		var index;
		PhaserComponents.View.call(this);
		this.options = options;
		this.model = this.options.model;
		this.model.changeSignal.add(this.onChanged, this);
		this.create();
		index = this.model.getData().index;
		if(index !== null){
			this.goToFrame(index);
		}
	};

	StepperButton.prototype = Object.create(PhaserComponents.View.prototype);
	StepperButton.prototype.constructor = StepperButton;

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
		this.sprite = new PhaserComponents.InteractiveSprite(this.game, this.options.bounds.x, this.options.bounds.y, this.options.asset);
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
		PhaserComponents.View.prototype.destroy.call(this);
		this.disableInput();
		this.model.changeSignal.remove(this.onChanged, this);
		this.model = null;
		this.sprite.destroy(true);
		this.options = null;
	};

	return StepperButton;

});


