var Schema = require("./Schema");
var Sequelize = require('sequelize');


module.exports = function(){
	
	var Project = Schema.add('Project', {
		title: Sequelize.STRING,
		description: Sequelize.TEXT
	});
	
//	var Task = Schema.add('Task', {
//		title: Sequelize.STRING,
//		description: Sequelize.TEXT,
//		deadline: Sequelize.DATE
//	});
}
