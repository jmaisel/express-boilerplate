/**
 * Module dependencies.
 */
var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('winston');

var routes = require('./routes');
var user = require('./routes/user');
var template = require('./routes/template');
var rest = require("./routes/rest-crud.js");
var app = express();

var Database = require('./orm/DataModel.js');

// Connect to the database
Database.connect({
	schema: "boilerplate_dev",
	username: "root",
	password: "",
	host: "localhost",
	port: 3306,
	dialect: "mysql",
	logging: logger.info,
	callback1: function(err){
		logger.info("Connected:", err);
		
		var role = Database.Role.build({name: "Administrators"});
		role.save().success(function(e){
			logger.info("role saved:", e);
			
			/**
			 * can either set the fk id directly in the json using the col name, 
			 * or lookup a persisted instance and call the appropriate setter
			 */
			
			var user = Database.User.build({fname:"joe"});//, system_role_id: 1});
			user.save().success(function(){
				Database.User.find(1).success(function(user){
//					console.log(user);
					user.setRole(e);
				});
			});
		});
	}
});


// set globals for all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

// bind handlers to uris
app.get('/', routes.index);
app.get('/template/*', template.list);

app.get('/rest/*', rest.find);
app.post('/rest/*', rest.create);
app.put('/rest/*', rest.update);
app.delete('/rest/*', rest.del);


// start the server
http.createServer(app).listen(app.get('port'), function() {
	logger.info('Express server listening on port ' + app.get('port'));
});
