/**
 * New node file
 */

var express = require('express');
var logger = require('winston');
var Schema = require("../orm/Schema");

exports.list = function(req, res){
	
	res.set({'Content-Type' : "text/javascript"});
	
	var app = express();
	var token = "/rest/";
	var uri = req.path;
	var tokens = uri.substring(token.length).split('/');
	
	var table = Schema.entities()[tokens[0]];
	table.find(parseInt(tokens[1])).success(function(model){
		
		if( model ){
			res.json(model);
		}
		
		else{
			res.json({err: "No data found."});
		}
	});
};