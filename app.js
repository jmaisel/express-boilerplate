/**
 * Module dependencies.
 */
var http = require('http');
var path = require('path');
var express = require('express');
var winston = require('winston');

var routes = require('./routes');
var user = require('./routes/user');
var template = require('./routes/template');
var rest = require("./routes/rest-crud.js");
var app = express();

var Schema = require('./orm/Schema.js');
var loadDomainModel = require('./orm/DataModel.js');

// Connect to the database
Schema.connect({
	schema: "boilerplate_dev",
	username: "root",
	password: "",
	host: "localhost",
	port: 3306,
	dialect: "mysql",
	logging: winston.info,
	callback: function(err){
		winston.info((err ? "Error " + err + ".  Not" : "") + " Connected");
		
		//*
		if( err ){
			return;
		}
		
		var role = Schema.build('system_roles', {
			name: "Administrators"
		});
		
		role.save().complete(function(){
			winston.info(err?"not saved " + err:"saved");
		});

		winston.info( role.get("name") );
		//*/
	}
});

loadDomainModel();
Schema.sync();

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
app.get('/users', user.list);
app.get('/template/*', template.list);
app.get('/rest/*', rest.list);

// start the server
http.createServer(app).listen(app.get('port'), function() {
	winston.info('Express server listening on port ' + app.get('port'));
});
