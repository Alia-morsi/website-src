/* my ajax utils written for study purposes NOT the one in the course*/
/*necessary functions:
1. asynchttprequest function that takes in url, response handler,
and a true/false for whether the response is json or other

Note: the reason we used an IIFE is to expose the function to window obj?
why did we even need to do that? In the course example this was used to expose
the function as part of a namespace called $ajaxUtils, which we have chosen
to immitate. Otherwise, it really was not needed we could have just used 
the global function name. The course method is probably cleaner..
*/

//to pass a variable between the handler assigned to on ready state changed
//and the rest of the asyncHTTPrequest function, it has to be something
//in the closure of asyncHTTPRequest and modified as a global var by the 
//handler function..

//this ajax util does NOT support IE5 and 6.
//to do this we'd need to use the activex object from the window.

(function(global){
	var sendGetRequest = function(request_url, response_handler, isJSON){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			//i think we can use the this qualifier because the inner function
			//was not declared using new, so this refers to the XMLHttpReq obj
			if(this.readyState == 4 && this.status == 200){
				//if status text is OK
				if(isJSON===true){
					response_handler(JSON.parse(xhttp.responseText));
				}
				else{
					response_handler(xhttp.responseText);
				}
			}
		}

		xhttp.open('GET', request_url, true);
		xhttp.send();
	}
	global.$ajax = sendGetRequest;
})(window);