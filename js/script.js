//script to load the snippets
(function(global){
	var category_snippet = "snippets/homepage/categories.html";
	var tile_snippet = "snippets/homepage/category-tiles.html";
	
	//utility functions:
	var insert_html = function(selector, html){
		document.querySelector(".main-content").innerHTML = html;
	};

	var show_loading = function(selector){
		var html = "<div class='text-center'>";
		html += "<img src='images/ajax-loader.gif'></div>"
		insert_html(selector, html);
	}

	//text substitution utility
	var insert_property = function(string, property, value){
		property = "{{" + property + "}}";
		string = string.replace(new RegExp(property, "g"), value);
		return string;
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
	
	$(function(){
		show_loading(".main-content");

	//our response handler only takes the response text object..
	//this is how it was set in the ajax utils
	

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
	});
	
})(window); //there was no need to pass the window obj as we're not exposing
			//anything
