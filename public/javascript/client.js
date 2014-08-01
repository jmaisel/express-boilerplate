/**
 * Fetch data from the server
 * 
 * @param uri the ReST endpoint
 * @param dataType
 * @returns
 */
function getData(uri, dataType, async, callback){
	var result = null;
	
	$.ajax({
		async: async,
		url: uri,
		dataType: dataType || "json",
		success : async?function(data){
			result = data;
		}:callback
	});
	
	return result;
}

/**
 * Render a template to one or more elements
 * @param targetEl jquery selector for target elements
 * @param tmplName template name
 * @param data data to use rendering the template
 */
function renderTemplate(targetEl, tmplName, data){
	var tmpl = Templates[tmplName];
	$(targetEl).html(tmpl(data));
}

var View = function(){
	
	var that = {
			
	};
	
	return that;
}





