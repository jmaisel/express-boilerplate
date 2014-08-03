var Sequelize = require('sequelize');
var extend = require("xtend");
var logger = require('winston');

/**
 * Baseline datamodel
 */
var exports = module.exports;

exports.connect = function(args){
	
	logger.info("connecting.....");
	
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
	logger.info("Initializing Sequelize:", config);
	exports.orm = new Sequelize(config.schema, config.username, config.password, config);
	
	exports.orm.authenticate().complete(function(err) {
		/**
		 * Role
		 */
		exports.Role = exports.orm.define('system_roles', {
			name: {
				type: Sequelize.STRING,
				unique: true
			}
		});
		
		/**
		 * User
		 */
		exports.User = exports.orm.define('system_users', {
			username: Sequelize.STRING,
			fname: Sequelize.STRING,
			lname: Sequelize.STRING,
			email: {
				type:Sequelize.STRING,
				unique:true
			},
			system_roles_id: {
				field: "system_roles_id",
				type: Sequelize.INTEGER,
				references: 'system_roles',
				referencesKey: 'id',
				allowNull: true
			}
		});
		
		exports.Role.hasMany(exports.User, {as: 'role', foreignKey: 'system_roles_id'});
		exports.User.belongsTo(exports.Role, {as: 'role', foreignKey: 'system_roles_id'});
		
		/**
		 * Posts
		 */
		exports.Post = exports.orm.define('blog_posts', {
			title: Sequelize.STRING,
			points: Sequelize.INTEGER,
			content: Sequelize.TEXT,
			user: {
				field: "system_user_id",
				type: Sequelize.INTEGER,
				references: "system_users",
				referencesKey: "id"
			}
		});
//		exports.Post.hasMany(exports.User, {as: 'user', foreignKey: 'system_user_id'});
//		exports.User.belongsTo(exports.Post, {as: 'user', foreignKey: 'system_user_id'});
		
		/**
		 * Comments
		 */
		exports.Comment = exports.orm.define('blog_comments', {
			content: Sequelize.STRING,
			points: Sequelize.INTEGER,
			parent: {
				field: "parent_id",
				type: Sequelize.INTEGER,
				references: "blog_comments",
				referencesKey: "id"
			},
			user: {
				field: "user_id",
				type: Sequelize.INTEGER,
				references: "system_users",
				referencesKey: "id"
			}
		});
		
		exports.Post.hasMany(exports.Comment, {as: 'post', foreignKey: 'system_post_id'});
		exports.Comment.belongsTo(exports.Post, {as: 'role', foreignKey: 'system_roles_id'});
		
		logger.info("initial sync");
		exports.orm.sync({
			force : (args && args.force === true)
		}).complete(function(e){
			logger.info("sync complete");
			
			if( args.callback )
				args.callback(true);
		});
	});
};