var Schema = require("./Schema");
var Sequelize = require('sequelize');

/**
 * Baseline datamodel
 */
module.exports = function(){
	
	/**
	 * Roles
	 */
	var foo = Schema.add('system_roles', {
		name: {
			type: Sequelize.STRING,
			unique: true
		}
	});
	
	/**
	 * Users
	 */
	Schema.add('system_users', {
		username: Sequelize.STRING,
		fname: Sequelize.STRING,
		lname: Sequelize.STRING,
		email: {
			type:Sequelize.STRING,
			unique:true
		},
		role_id: {
			field: "role",
			type: Sequelize.INTEGER,
			references: 'system_roles',
			referencesKey: 'id',
			allowNull: true
		}
	});
	
	/**
	 * Posts
	 */
	Schema.add('blog_posts', {
		title: Sequelize.STRING,
		points: Sequelize.INTEGER,
		content: Sequelize.TEXT,
		user_id: {
			field: "user",
			type: Sequelize.INTEGER,
			references: "system_users",
			referencesKey: "id"
		}
	});
	
	/**
	 * Comments
	 */
	Schema.add('blog_comments', {
		content: Sequelize.STRING,
		points: Sequelize.INTEGER,
		parent_id: {
			field: "parent",
			type: Sequelize.INTEGER,
			references: "blog_comments",
			referencesKey: "id"
		},
		user_id: {
			field: "user",
			type: Sequelize.INTEGER,
			references: "system_users",
			referencesKey: "id"
		}
	});
	
	return Schema.entities();
};
