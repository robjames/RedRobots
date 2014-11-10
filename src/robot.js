'use strict';
function Robot(mars, x, y, o) {
	this.orientations = ['N', 'E', 'S', 'W'];

	if (!(mars instanceof Mars)) throw new Error('A Robot must be placed on a landmass like Mars.');

	if (isNaN(x)) throw new Error('Robot position (x) must be a number');
	if (isNaN(y)) throw new Error('Robot position (y) must be a number');
	if (typeof o !== 'string') throw new Error('Robot orientation must be a String');
	o = o.toUpperCase();
	if (this.orientations.indexOf(o) < 0) throw new Error('Robot orientation must be N,S,E or W');
	
	if (x < 0) throw new Error('Robot position (y) must be a positive number');
	if (y < 0) throw new Error('Robot position (x) must be a positive number');
	if (x > 50) throw new Error('Robot position (y) must not exceed 50');
	if (y > 50) throw new Error('Robot position (x) must not exceed 50');
	
	this.land = mars;
	this.x = x;
	this.y = y;
	this.o = o;
	
}
Robot.prototype.isDead = function(){
	return (!!this.dead);
};
Robot.prototype.die = function(){
	this.dead = true;
};
Robot.prototype.turn = function(turn){
	var currentPosit = this.orientations.indexOf(this.o);
	var posit = (turn === 'L') ?  currentPosit-1 : currentPosit+1 ;
	if (posit < 0) { posit = this.orientations.length -1;}
	if (posit > this.orientations.length-1) { posit = 0;}
	this.o = this.orientations[posit];
};

Robot.prototype.forward = function(){
	var x = this.x;
	var y = this.y;

	var orientation = this.o;
	if (orientation === 'N') this.y++;
	if (orientation === 'E') this.x++;
	if (orientation === 'S') this.y--;
	if (orientation === 'W') this.x--;
	
	if (this.land.hasDeathScent(this.x,this.y)) {
		this.x = x;
		this.y = y;
		return;
	}
	if (this.land.isUnsafeLanding(this.x,this.y)) this.die();
	
};
Robot.prototype.toString = function(){
	return this.x +' '+ this.y +' '+ this.o + ((this.isDead()) ? ' LOST': '');
};
Robot.prototype.order = function(order){
	this[order]();
};
Robot.prototype.orders = function(orders){
	var that = this;
	var ordersArr = orders.split('');
	ordersArr.forEach(function(order){
		that[order]();
	});
};
Robot.prototype.F = function(){
	return this.forward();
};
Robot.prototype.R = function(){
	return this.turn('R');
};
Robot.prototype.L = function(){
	return this.turn('L');
};
Robot.prototype.addOrder = function(order, funct){
	this[order] = funct;
};