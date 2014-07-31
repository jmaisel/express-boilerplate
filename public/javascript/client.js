function getData(uri, mimeType){
	var result = null;
	var params = {
		async: false,
		url: uri,
		dataType: mimeType || "json",
		success : function(data){
			result = data;
		}
	};
	console.log( params );
	$.ajax(params);
	
	return result;
}

function renderTemplate(targetEl, tmplName, data){
	//jade.render(domNode, templateName, data);
	var tmpl = Templates[tmplName];
	console.log( tmpl );
	tmpl.render(targetEl, tmplName, data);
}