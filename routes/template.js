/*
 * GET users listing.
 */
var jade = require('jade');
var fs = require('fs');
var express = require('express');

exports.list = function(req, res) {
	
	res.set({'Content-Type' : "text/javascript"});
	
	var app = express();
	var token = "views/browser/";
	var templateUri = "/template/";
	var templatesVar = "Templates";

	/**
	 * Walk a directory tree recursively and invoke callback()
	 * for each matching file and directory.  Filter by regex
	 * pattern.  Return an array of matching files.
	 */
	var walk = function(dir, pattern, callback) {
		
		var results = [];
		var list = fs.readdirSync(dir);
		list.forEach(function(file) {
			
			file = dir + '/' + file;
			var stat = fs.statSync(file);
			
			if( !stat.isDirectory() && !file.match(pattern)){
				return;
			}

			if (stat && stat.isDirectory()){
				results = results.concat(walk(file, pattern, callback));
			}
			else{
				results.push(file);
			}
			
			callback(file, stat);
		});
		
		return results;
	};
	
	/**
	 * Compile a jade template into javascript to be returned to the browser
	 */
	var buffer = "";
	function compile(file, stat){
		
		if( stat.isDirectory() ){
			return;
		}
		
		var bytes = fs.readFileSync(file);
		var name = file.substring(file.lastIndexOf(token) + token.length).replace(new RegExp(".jade$","g"), "");
		console.log( "compiling", name, file );
		
		//Compile a function
		var js = jade.compileClient(bytes, {client: true});
		buffer += (templatesVar + "['" + name + "'] = " + js + "\n\n");
	}
	
	var pattern = new RegExp(req.path.substring(req.path.lastIndexOf(templateUri) + templateUri.length));
	var files = walk(app.get("views"), pattern, compile);

	console.log("--> pattern:", pattern, "files:", files);
	res.send("Templates = {};\n\n" + buffer);
};