'use strict'
function Mars(width, height) {
	if (isNaN(width)) throw new Error('Mars size (x) must be a number');
	if (isNaN(height)) throw new Error('Mars size (y) must be a number');
	if (height < 0) throw new Error('Mars size (y) must be a positive number');
	if (width < 0) throw new Error('Mars size (x) must be a positive number');
	if (height > 50) throw new Error('Mars size (y) must not exceed 50');
	if (width > 50) throw new Error('Mars size (x) must not exceed 50');
	
	this.width = width;
	this.height = height;
	this.deaths = [];
	
	return this;
}

Mars.prototype.addDeath = function(x,y) {
	this.deaths.push(x+'-'+y);
};

Mars.prototype.hasDeathScent = function(x,y) {
	return (this.deaths.indexOf(x+'-'+y) >= 0);
};

Mars.prototype.isUnsafeLanding = function(x,y) {
	if (x > this.width || y > this.height || x < 0 || y < 0) {
		this.addDeath(x,y);
		return true;
	}
	return false;
};