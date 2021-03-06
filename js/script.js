//script to load the snippets
(function(global){
	var category_snippet = "snippets/homepage/categories.html";
	var tile_snippet = "snippets/homepage/category-tiles.html";
	var professional_snippet = "snippets/professional/professional.html";
	var personal_snippet = "snippets/personal/personal.html";
	var professional_tile_snippet = "snippets/professional/tiles.html";
	var cv_snippet = "";

	//color scales:
	var green_scale = ["#6CC2BD", "#89CECA", "#A6DAD7", "#C4E6E4", "#E1F2F1", "#FFFFFF"];
	var teal_scale = ["#5A809E", "#7B99B1", "#9CB2C4", "#BDCCD8", "#DEE5EB", "#FFFFFF"];
	var pink_scale = ["#F57D7C", "#F79796", "#F9B1B0", "#FBCBCA", "#FDE5E4", "#FFFFFF"];
	var salmon_scale = ["#FFC1A9", "#FFCDBA", "#FFD9CB", "#FFE6DC", "#FFF2ED", "#FFFFF"];
	var beige_scale = ["#FEE4C4", "#FEE9CF", "#FEEEDB", "#FEF4E7", "#FEF9F3", "#FFFFFF"];

	var colors = [green_scale, teal_scale, pink_scale, salmon_scale, beige_scale];
	

	//utility functions:
	var insert_html = function(html, selector){
		document.querySelector(selector).innerHTML = html;
	}

	var show_loading = function(selector){
		
		var html = "<div class='text-center' style='position: relative; top:110px;'>";
		html += "<img src='images/ajax-loader.gif'></div>";
	
		insert_html(html, selector);
	}

	var clear_loading = function(selector){
		document.querySelector(selector).innerHTML = "";
	}

	//text substitution utility
	var insert_property = function(string, property, value){
		property = "{{" + property + "}}";
		string = string.replace(new RegExp(property, "g"), value);
		return string;
	}


	var tile_click = function(event){
		//if we need additional functionality to the click we can write it here
	}


	var tile_hover = function(event){

	}

	//expected structure of arrays
	//categories_array: (array of category objects
	//tiles_array: array of strings. each belongs to a category obj

	/*eventually this will be loaded from a file*/

	var categories_array = [
	{ 
		name: "Professional", 
		tiles: ["KarmSolar", "NCR", "AUC", "Other", "Awards"],
		colors: ["#6CC2BD", "#5A809E", "#F57D7C", "#FFC1A9", "#FEE4C4"],
		icons: ["solar-battery", "atm", "mortarboard", 
				"light-bulb", "add-star"]
	},
	{
		name:"Personal",
		tiles: ["Vocal (CVT)", "Pilates", "Music Theory", "Portuguese"], 
		colors: ["#6CC2BD", "#5A809E", "#F57D7C", "#FFC1A9"],
		icons: ["karaoke", "pilates", "music-stave", "rio"]
	}];


	var professional_array = [
	{
		name: "KarmSolar", 
		tiles: ["Solar Water Pumping Port (to C++)",
		 		 "Hybrid Solar Water Pumping (Labview)", 
		 		 "DBSync", 
		 		 "Single Source Solar Water Pumping (Labview)", 
		 		 "", 
		 		 ""],
		
		proj_data: [{
			description: "Lorem Ipsum dolor sit amet", 
			image_link: "",	
		},
		{
			description: "Lorem Ipsum dolor sit amet",
			image_link: ""
		}, 
		{
			description: "Lorem Ipsum dolor sit amet",
			image_link: ""
		},
		{
			description: "Lorem Ipsum dolor sit amet",
			image_link: ""
		},
		{
			description: "Lorem Ipsum dolor sit amet",
			image_link: ""
		},
		{
			description: "Lorem Ipsum dolor sit amet",
			image_link: ""
		}]
	}, 
	{
		name: "NCR",
		tiles: ["Smart Queue for Bank Services"],
		proj_data: [{
			description: "NCR proj description",
			image_link: "" 
		}] //end of proj_data
	}, //end of ncr
	{
		name: "AUC Coursework", 
		tiles: ["Object Oriented Programming C++",
					"Computer Security", 
					"Independent Study: NLP",
					"Senior Project: PayPhone"], //end of titles
		proj_data: [{
			description: "lorem ipsum dolor sit amet",
			image_link: ""
		}, //oop
		{
			description: "lorem ipsum dolor sit amet",
			image_link: ""
		}, //security
		{
			description: "lorem ipsum dolor sit amet",
			image_link: ""
		}, //indepe study
		{
			description: "lorem ipsum dolor sit amet", 
			image_link: ""
		}] //payphone //end of proj data
	}];



	var html_to_dom = function(html){
		var dom = document.createElement('div');
		dom.innerHTML = html;
		return dom.childNodes[0];
	}

	//update function to take in the object for which
	//we are generating a color row
	var generate_color_row = function(color_array, num, rowlen, snippet, job){
		//rowlen is the minimum row length.
		//it is only necessary if we apply more complicated gradients
		//for now all rows are made of 6.
		var tiles = [];
		var rows = Math.ceil(num/rowlen);
		var new_div;

		for(var i=0; i<rows; i++){
			for(var col=0; col<color_array.length; col++){
				//element number = i*color_array.length+col;
				var el_num = i*color_array.length + col;
				var tile_title;
				var tile_desc;
				//check if undefined would give 0
				if(el_num < job.tiles.length){
					tile_title = job.tiles[el_num];
					tile_desc = job.proj_data[el_num].description;
				}
				else{
					tile_title = "";
					tile_desc = "";
				}
				
				var temp = insert_property(snippet, "bkgnd", color_array[col%rowlen]);
				temp = insert_property(temp, "description", tile_desc+col);
				temp = insert_property(temp, "title", tile_title);

				new_div = html_to_dom(temp);
				tiles.push(new_div);

				new_div.onclick = tile_click;
				/*
				new_div.querySelector(
					".clickable_tile").on("click", ) = function(event){
						console.log("Hi");};

				//new_div.o= function(event){console.log("Hi");};
				*/

			}
		}
		return tiles;
	}

	var generate_main_pg = function(categories_array,
	 gen_category_snippet, gen_tile_snippet){
		var res="";
		for(var cat=0; cat<categories_array.length; cat++){
			var tileshtml = "";
			var cat_tiles = categories_array[cat].tiles;
			var cat_colors = categories_array[cat].colors;
			var cat_icons = categories_array[cat].icons;

			for(var tile=0; tile<cat_tiles.length; tile++){
				var newtile = insert_property(gen_tile_snippet, "tilename", 
											cat_tiles[tile]);

				newtile = insert_property(newtile, "col", cat_colors[tile]);
				newtile = insert_property(newtile, "icon", cat_icons[tile]);
				tileshtml += newtile;
			}

			var sub =  insert_property(gen_category_snippet, "row_contents", 
									tileshtml);
			sub = insert_property(sub, "category_name", 
									categories_array[cat].name);
			res+= sub;
		}
		return res;
	}

	var generate_professional_page = function(professional_array,
		professional_snippet, professional_tile_snippet){
		var res="";

		var tile_info;
		var empty_tile_rows = [];
		for(var i=0; i<professional_array.length; i++){
			empty_tile_rows.push(generate_color_row(colors[i%colors.length], 
				professional_array[i].tiles.length, 6, professional_tile_snippet, professional_array[i]));
		} 
		//empty tiles has the colored tiles of all tiles in the prof array
		professional_page_rows = document.createElement("div");
		
		for(i=0; i<empty_tile_rows.length; i++){
			var updated_snippet = insert_property(professional_snippet, "title", 
				professional_array[i].name);
			
			var parent = html_to_dom(updated_snippet);
			var parent_row = parent.querySelector(".row");

			var empty_tiles = empty_tile_rows[i];
			for(var tile_index=0; tile_index<empty_tiles.length; tile_index++){
				parent_row.appendChild(empty_tiles[tile_index]);
			}
			professional_page_rows.appendChild(parent);
		}
		return professional_page_rows;
	}

	var show_professional_page = function(){
		show_loading(".main-content");
		
		global.$ajax(professional_snippet, function(responseText){
			var professional_html=responseText;
			global.$ajax(professional_tile_snippet, function(responseText){
				var dom_content = generate_professional_page(professional_array, 
					professional_html, responseText);

				clear_loading(".main-content");

				document.querySelector(".main-content").appendChild(dom_content);
				//insert_html(html, ".main-content");

			}, 
			false);
		},
		false);
	}

	var show_personal_page = function(){

	}

	var show_cv_page = function(){

	}

	var show_main_content = function(){
		show_loading(".main-content");
		//our response handler only takes the response text object..
		//this is how it was set in the ajax utils
		/*replace empty with category_snippet*/

		global.$ajax(category_snippet, 
			function(responseText){
				var category;
				var category_tile;
			
				category = responseText;

				global.$ajax(tile_snippet,
					function(responseText){
					category_tile = responseText;
					document.querySelector(".main-content").innerHTML=
						generate_main_pg(categories_array, category, 
							category_tile);
				},
				false);
		}, 
		false);
	}

	var update_expandable_area = function (event){
		//this is possibly not the best way to handle things but whatever
		var event_element = event.srcElement;
		var section_well;

		if(event.srcElement.className != "clickable_tile"){ //then it must be a child..
			for(var i=0; i<event.path.length; i++){
				var e = event.path[i];
				if(e.className =="clickable_tile"){
					event_element = e;
				}
				if(e.classList && e.classList.length > 0 && e.classList[0] == "section"){ //change to be more inclusive to other classes
					section_well = e.children[2];
				}
			}
		}
		else{
			section_well = event.path[3].children[2];
			//path[3] selects the relevant section, children[2] selects the row_selection
		}
		// children[1] selects invisible div
		var new_text = event_element.children[1].children[0].innerHTML;
		section_well.firstElementChild.innerText = new_text;
		
		$(section_well).collapse({ toggle: true});

	}

	$(function(){
		show_main_content();
	});

	global.$show_main_content = show_main_content;
	global.$show_professional_page = show_professional_page;
	global.$show_cv_page = show_cv_page;
	global.$show_personal_page = show_personal_page;
	global.$update_expandable_area = update_expandable_area;

	
})(window); //there was no need to pass the window obj as we're not exposing
			//anything
