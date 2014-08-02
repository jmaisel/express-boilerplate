var Sequelize = require('sequelize');
var extend = require("xtend");
var logger = require('winston');

/**
 * Schema singleton
 */
module.exports = new function() {

	logger.info("CREATING NEW Schema INSTANCE");
	
	var sequelize;
	var entities = {size:0};
	var config;
	
	function toModelName(tablename){
		var buf = "";
		
		for( var i=0; i<tablename.length; i++ ){
			var char = tablename[i];
			
			if( char === '_' ){
				continue;
			}
			
			if( i === 0 || tablename[i-1] === "_" ){
				char = char.toUpperCase();
			}
			
			if( tablename[i-1] !== "_" ){
				buf += char;
			}
		}
		
		return buf;
	}
	
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
				logging : logger.info,
				sync : {
					force : args.force === true
				},
				pool : {
					maxConnections : 100,
					minConnections : 10
				}
			};
			
			config = extend( basecfg, args );
			logger.info("Initializing Sequalize:", config);
			sequelize = new Sequelize(config.schema, config.username, config.password, config);

			sequelize.authenticate().complete(function(err) {
				if( args.callback ){
					args.callback(err, sequelize);
				}
			});
		},
		add : function(tablename, args) {
			logger.info("add:", tablename, toModelName(tablename), entities.size);
			
			entities[tablename] = sequelize.define(tablename, args);
//			entities[toModelName(tablename)] = entities[tablename];
			entities[entities.size++] = entities[tablename];
			
			return entities[tablename];
		},
		sync : function(args) {
			sequelize.sync({
				force : (args && args.force === true)
			}, function(){
				logger.info("sync completed with " + entities.size + " entities");
			});
		},
		build : function(name, args){
			return that.model(name).build(args);
		},
		model : function(name, args){
			return sequelize.model(name);
		},
		entities : function(arr) {
			if( arr ){
				entities = arr;
			}
			
			logger.info("returning " + entities.size + " entitites");
			return entities;
		},
		orm: function(){
			return sequelize;
		}
	};

	return that;
}();
