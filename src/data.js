'use strict'
function Data(){
	return this;
}
Data.prototype.input = function(str){
	if (typeof str !== "string") throw new Error('Data must be contructed with a String');
	this.str = str;
};
Data.prototype.findLandmass = function(){
	if (typeof this.str !== "string") throw new Error('please use input method');
	var params = this.str.match(/\d{1,2}\s\d{1,2}/)[0].split(' ');
	var land = new Mars(params[0], params[1]);
	if (!(land instanceof Mars)) throw new Error('please use correct format for land. i.e. 5 3');
	this.landmass = land;
};
Data.prototype.findRobots = function(){
	if (typeof this.str !== "string") throw new Error('please use input method');
	var arr = this.str.match(/\d{1,2}\s\d{1,2}\s[NSEW][\r\n][RLF]+/g);
	if (typeof arr !== "object") throw new Error('please use correct format for a Robot');
	this.robotsArr = arr;
};
Data.prototype.splitRobots = function(){
	if (typeof this.robotsArr !== "object") throw new Error('please use findRobots method');
	var that = this;
	this.robots = [];
	this.robotsArr.forEach(function(r){
		var arr = r.split(/[\r\n]/);
		arr[0] = arr[0].split(' ');
		that.robots.push(arr);
	});
};
Data.prototype.processRobots = function(){
	if (typeof this.robots !== "object") throw new Error('please use splitRobots method');
	var that = this;
	this.outputHolder = [];
	this.robots.forEach(function(arr){
		var params = arr[0];
		var commands = arr[1];
		var robot = new Robot(that.landmass, params[0], params[1], params[2]);
		robot.orders(commands);
		that.outputHolder.push(robot.toString());
	});
};
Data.prototype.output = function(){
	if (typeof this.outputHolder !== "object") throw new Error('please use processRobots method');
	return this.outputHolder.join('\n');
};
Data.prototype.runner = function(str){
	this.input(str);
	this.findLandmass();
	this.findRobots();
	this.splitRobots();
	this.processRobots();
	return this.output();
};