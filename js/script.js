//script to load the snippets
(function(global){
	var categories_snippet = "snippets/homepage/categories.html";
	
	//utility functions:
	var insert_html = function(selector, html){
		document.querySelector(".main-content").innerHTML = html;
	};

	var show_loading = function(selector){
		var html = "<div class='text-center'>";
		html += "<img src='images/ajax-loader.gif'></div>"
		insert_html(selector, html);
	}
	
	$(function(){
		show_loading(".main-content");

	//our response handler only takes the response text object..
	//this is how it was set in the ajax utils
	global.$ajax(categories_snippet, 
		function(responseText){
			console.log(responseText);
			document.querySelector(".main-content").innerHTML = responseText;
		}, 
		false);
	});
	
})(window); //there was no need to pass the window obj as we're not exposing
			//anything
