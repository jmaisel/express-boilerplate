/**
 * Module dependencies.
 */
var http = require('http');
var path = require('path');
var express = require('express');

var routes = require('./routes');
var user = require('./routes/user');
var template = require('./routes/template');
var Schema = require('./orm/Schema.js');
var loadDomainModel = require('./orm/DataModel.js');

var app = express();

Schema.connect({
	schema: "boilerplate_dev",
	username: "root",
	password: "",
	host: "localhost",
	port: 3306,
	dialect: "mysql",
	logging: console.log,
	callback: function(err){
		console.log((err ? "Error " + err + ".  Not" : "") + " Connected");
		
		if( err ){
			return;
		}
		
		var role = Schema.build('system_roles', {
			name: "Developers"
		});
		
		role.save().complete(function(){
			console.log(err?"not saved " + err:"saved");
		});

		console.log( role.get("name") );
	}
});

loadDomainModel();
Schema.sync();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('Schema', Schema);

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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/template/*', template.list);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
