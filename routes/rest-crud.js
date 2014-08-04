/**
 * Simple ReST api example with node, express, sequelize and mysql
 */

var express = require('express');
var logger = require('winston');
var Database = require('../orm/DataModel.js');

/**
 * Find a row by entity type and id
 * 
 * @param entity the entity class name
 * @param id the row pk
 * @param callback success function
 */
function findByTypeAndId(entity, id, callback){

	if( Database[entity] ){
		Database[entity].find(id).success(callback);
	}
	else{
		callback({err: "No entity matching the name '" + entity + "' was found."});
	}
}

/**
 * Parse entity information from the uri assuming the format
 * <code>.../ClassName/Id</code>
 * 
 * @param the request uri
 * @returns entity and id
 */
function entIdInf(uri) {
	var token = "/rest/";
	var tokens = uri.substring(token.length).split('/');
	
	return {
		entity : tokens[0],
		id : tokens[1]
	};
}

/**
 * Get
 */
exports.find = function(req, res){
	
	res.set({'Content-Type' : "text/javascript"});
	var inf = entIdInf(req.path);
	
	findByTypeAndId(inf.entity, inf.id, function(row){
		res.json(row);
	});
};

/**
 * Put
 */
exports.update = function(req, res){
	
	res.set({'Content-Type' : "text/javascript"});
	var inf = entIdInf(req.path);

	findByTypeAndId(inf.entity, inf.id, function(row){
		res.json(row);
	});
};

/**
 * Post
 */
exports.create = function(req, res){
	
	res.set({'Content-Type' : "text/javascript"});
	var inf = entIdInf(req.path);

	findByTypeAndId(inf.entity, inf.id, function(row){
		res.json(row);
	});
};

/**
 * Delete
 */
exports.del = function(req, res){
	
	res.set({'Content-Type' : "text/javascript"});
	var inf = entIdInf(req.path);

	findByTypeAndId(inf.entity, inf.id, function(row){
		res.json(row);
	});
};


