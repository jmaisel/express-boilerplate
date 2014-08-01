var Sequelize = require('sequelize');
var extend = require("xtend");

(function() {

	var sequelize;
	var entities = [];
	var config;
	
	// sequelize.sync({
	// force : true
	// }).complete(function(err) {
	// console.log( err );
	// if (err) {
	// console.log('An error occurred while creating the table:', err)
	// } else {
	// console.log('It worked!')
	// }
	// });

	var that = {
		register : function(entity) {

		},

		/**
		 * dialect, schema, host, port, username, password
		 */
		connect : function(args) {
			if( !args )
				args = {};
			
			var basecfg = {
				dialect : "mysql",
				host : 'localhost',
				port : 3306,
				logging : console.log,
				sync : {
					force : true
				},
				pool : {
					maxConnections : 100,
					minConnections : 10
				}
			};
			
			config = extend( basecfg, args );
			console.log( config );
			sequelize = new Sequelize(config.schema, config.username, config.password, config);

			sequelize.authenticate().complete(function(err) {
				console.log((err ? "Error " + err + ".  Not" : "") + " Connected");
			});
		},
		sync : function(args) {
			sequelize.sync({
				force : true
			})
		},
		add : function(name, args) {
			entities[name] = sequelize.define(name, args);
			return entities[name];
		},
		entities : function(arr) {
			if (!arr)
				return entities
			else
				entities = arr;
		},
		orm: function(){
			return sequelize;
		}
	};

	module.exports = that;
	return that;
})();
