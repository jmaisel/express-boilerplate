/**
 * New node file
 */

var express = require('express');
var logger = require('winston');

function objectIdPair(entity, id, req, res){
//	var table = Schema.entity(entity);
//	
//	table.find(id).success(function(model){
//		
//		if( model ){
//			res.json(model);
//		}
//		
//		else{
//			res.json({err: "No data found."});
//		}
//	});
}

exports.list = function(req, res){
	
	res.set({'Content-Type' : "text/javascript"});
	
	var token = "/rest/";
	var tokens = req.path.substring(token.length).split('/');
	var table = tokens[0];
	var id = tokens[1];
	
	objectIdPair(table, id, req, res);
};



