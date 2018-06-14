// lunr

//global docs var
var docs = [];

var DoSearch = function () {
    
//get JSON
    $.getJSON("/lunrRedux/Includes/lunrIndex.json", function (data) {
    //and loop though JSON to populate docs array   
    $.each( data, function(key) {
        docs.push( data[key] );
    });
   
        
        
//lunr search field settings
    var idx = lunr(function () {
        this.ref('link')
        this.field('title')
        this.field('description')
        this.field('keywords')
        
    //and loop through docs for matched terms
    docs.forEach(function (doc) {
        this.add(doc)
        }, this)  
    });
 
        
        
//parse the query string in the url and deliver it as the searchTerms variable
        function parse_query_string(query) {
        var vars = query.split("&");
        var query_string = {};
            for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    // If first entry with this name
                    if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
            } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
        }   
        
        var query = window.location.search.substring(1);
        var searchTerms = parse_query_string(query);            

        
        
//var for terms searched with lunr func call
    var SearchArray = idx.search(searchTerms.search.replace(/\+/g, " "));
        
    // add title & description of each doc into each search result, too (this doesn't come standard with lunr.js)
	for(var index in SearchArray) {
		SearchArray[index].title = data.filter(function(docs) {
			return docs.link === SearchArray[index].ref;
		})[0].title;
        SearchArray[index].description = data.filter(function(docs) {
			return docs.link === SearchArray[index].ref;
		})[0].description;
	}
    
//empty var array for writing SearchArray results to html
    var SearchArrayDOM = [];
    
    //loop to write html
    $.each( SearchArray, function(index) {
    SearchArrayDOM.push( '<div><p><a href="' + SearchArray[index].ref + '">' + SearchArray[index].title + '</a></p><p>' + SearchArray[index].description + '</p></div>' );
    });

        
        
//Search page results <div>
    var ResultsDiv = document.getElementById('SearchResults'); 
        
    //post html to Search page results <div>
    if (SearchArray != "") {
    $(ResultsDiv).html(SearchArrayDOM);
    } else {
    $(ResultsDiv).html("No search results found. Please enter new search terms."); 
    }   
    
});
};

DoSearch();