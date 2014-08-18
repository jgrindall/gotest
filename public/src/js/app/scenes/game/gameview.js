
define(['app/game', 'app/scenes/game/player', 'app/scenes/game/enemy', 'app/scenes/game/killarea', 'app/scenes/game/gunner', 'app/components/background', 'app/scenes/game/stars', 'app/commsdata', 'app/locdata', 'app/scenes/game/platforms', 'app/scenes/game/gamemode'],

function(Game, Player, Enemy, KillArea, Gunner, Background, Stars, CommsData, LocData, Platforms, GameMode){
	
	"use strict";
	
	var GameView  = function(options){
		this.options = options;
		this.deadSignal = new Phaser.Signal();
	};
	
	GameView.prototype.controlUp = function(data) {
		this.player.controlUp(data);
	};
	
	GameView.prototype.controlDown = function(data) {
		this.player.controlDown(data);
	};
	
	GameView.prototype.addBg = function() {
		this.bg = new Background({"asset":'background'});
		this.bg.create();
		Game.getInstance().world.add(this.bg.sprite);
	};
	
	GameView.prototype.addPlatforms = function() {
		this.platforms = new Platforms(this.options.tiles);
		this.platforms.create();
		Game.getInstance().world.add(this.platforms.tileMapLayer);
	};
	
	GameView.prototype.addPlayer = function() {
		this.player = new Player(this.options.hero);
		this.player.create();
		this.player.deadSignal.add(this.onDead, this);
		Game.getInstance().world.add(this.player.sprite);
	};
	
	GameView.prototype.onDead = function(data){
		this.player.destroy();
		this.player.deadSignal.removeAll(this);
		this.player = null;
		this.deadSignal.dispatch();
	};
	
	GameView.prototype.addBullets = function(){
		this.bullets = new Phaser.Group(Game.getInstance(), null, 'bullets', false, true, Phaser.Physics.ARCADE);
    	this.bullets.createMultiple(10, 'killarea', 0, false);
    	this.bullets.setAll('outOfBoundsKill', true);
    	this.bullets.setAll('checkWorldBounds', true);
    	Game.getInstance().world.add(this.bullets);
	};
	
	GameView.prototype.addStars = function() {
		this.stars = new Stars(this.options.stars);
		this.stars.create();
		Game.getInstance().world.add(this.stars.group);
	};
	
	GameView.prototype.addEnemies = function() {
		this.enemy1 = new Enemy(this.options.enemies);
		this.enemy1.create();
		Game.getInstance().world.add(this.enemy1.sprite);
	};
	
	GameView.prototype.addKillAreas = function() {
		this.kill1 = new KillArea(this.options.killareas);
		this.kill1.create();
		Game.getInstance().world.add(this.kill1.sprite);
	};
	
	GameView.prototype.shoot = function(data) {
		var bullet = this.bullets.getFirstExists(false);
		if(bullet){
			bullet.reset(data.target.sprite.x, data.target.sprite.y);
			bullet.body.allowGravity = false;
			bullet.body.velocity.x = -300;
			bullet.body.velocity.y = 0;
			//TODO make Bullet class and Bullets class
		}
	};
	
	GameView.prototype.addGunners = function() {
		this.gun1 = new Gunner(this.options.gunners);
		this.gun1.create();
		this.gun1.shootSignal.add(this.shoot, this);
		Game.getInstance().world.add(this.gun1.sprite);
	};
	
	GameView.prototype.create = function() {
		this.addBg();
		this.addPlatforms();
		this.addPlayer();
		this.addBullets();
		this.addGunners();
		this.addEnemies();
		this.addKillAreas();
		this.addStars();
		Game.getInstance().camera.follow(this.player.sprite);
	};
	
	GameView.prototype.collide = function() {
		var physics = Game.getPhysics();
		if(this.player && !this.player.dead){
	   		physics.collide(this.player.sprite, this.platforms.tileMapLayer);
	   		physics.overlap(this.player.sprite, this.stars.group, this.collectStar, null, this);
			physics.overlap(this.player.sprite, this.enemy1.sprite, this.hitEnemy, null, this);
			physics.overlap(this.player.sprite, this.kill1.sprite, this.hitKillArea, null, this);
	   	}
	    physics.collide(this.kill1.sprite, this.platforms.tileMapLayer);
	    physics.collide(this.enemy1.sprite, this.platforms.tileMapLayer);
		physics.collide(this.stars.group, this.platforms.tileMapLayer);
	};
	
	GameView.prototype.update = function() {
	    this.collide();
	    if(this.player){
			this.player.update();
		}
		this.stars.update();
		this.enemy1.update();
		this.gun1.update();
	};

	GameView.prototype.collectStar = function(player, star){
		star.kill();
	};
	
	GameView.prototype.hitEnemy = function(player, enemy){
		//console.log("dead - enemy");
		this.player.kill();
	};
	
	GameView.prototype.hitKillArea = function(player, killArea){
		//console.log("dead - kill");
		//this.player.kill();
	};

	GameView.prototype.destroy = function() {
		this.bg.destroy();
		this.platforms.destroy();
		if(this.player){
			this.player.destroy();
		}
		this.bg = null;
		this.platforms = null;
		this.player = null;
	};
	
	return GameView;

});
	
