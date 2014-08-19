
define(['app/components/buttons/tickbutton', 'app/game', 'app/components/container', 'app/utils/textfactory', 'app/components/abstractpopup'],

function(TickButton, Game, Container, TextFactory, AbstractPopup){
	
	"use strict";
		
	var Growl = function(options){
		options.bgasset = 'alert';
		AbstractPopup.call(this, options);
	};
	
	Growl.prototype = Object.create(AbstractPopup.prototype);
	Growl.prototype.constructor = Growl;
	
	Growl.WIDTH = 400;
	Growl.HEIGHT = 200;
	
	Growl.prototype.addOk = function () {
		this.addButton(TickButton, 'bottom');
	};
	
	Growl.prototype.addButtons = function () {
		AbstractPopup.prototype.addButtons.call(this);
		this.addOk();
	};
	
	return Growl;
	
});
	






