var Sequelize = require('sequelize');
var extend = require("xtend");

(function() {

	var sequelize;
	var entities = [];
	var config;

	var that = {

		/**
		 * dialect, schema, host, port, username, password
		 */
		connect : function(args) {
			if( !args ){
				args = {};
			}
			
			var basecfg = {
				dialect : "mysql",
				host : 'localhost',
				port : 3306,
				logging : console.log,
				sync : {
					force : args.force === true
				},
				pool : {
					maxConnections : 100,
					minConnections : 10
				}
			};
			
			config = extend( basecfg, args );
			sequelize = new Sequelize(config.schema, config.username, config.password, config);

			sequelize.authenticate().complete(function(err) {
				if( args.callback ){
					args.callback(err, sequelize);
				}
			});
		},
		sync : function(args) {
			sequelize.sync({
				force : (args && args.force === true)
			});
		},
		add : function(name, args) {
			entities[args.modelName || name] = sequelize.define(name, args);
			return entities[args.modelName || name];
		},
		build : function(name, args){
			return that.model(name).build(args);
		},
		model : function(name, args){
			return sequelize.model(name);
		},
		entities : function(arr) {
			if (!arr){
				return entities;
			}
			else{
				entities = arr;
			}
		},
		orm: function(){
			return sequelize;
		}
	};

	module.exports = that;
	return that;
})();
