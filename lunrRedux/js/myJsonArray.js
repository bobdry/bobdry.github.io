//getJSON and a callback

//this function goes and gets the Json data
function getData(callback) {
   $.getJSON("/lunrRedux/js/lunrIndex.json")
   //IF it can get the data, it will give the data to the getDataCallback funtion to use 
    .done(function (data) {
        getDataCallback(data);
    })
    //ELSE IF it can't get the data it will throw an error
    .fail(function (jqXHR, textStatus, err) {
        alert(err);
        return;
    });
}

//this Callback function is where we do all the stuff we want to with the returned data
function getDataCallback(data){
    var myJsonArray = [];
    $.each( data, function(key) {
        //if () { //here we could add an if conditional for a multi dimensional array. we want to write only the json objects who match the html data attribute (https://www.w3schools.com/tags/att_global_data.asp) set in the destination div 
        myJsonArray.push( data[key] );
        //}    
    });
    //return myJsonArray;
}

//And here we (1) first make the getData function call to get the JSON and then (2) pass the callback function as the argument to do all the stuff we want to do with the returned JSON data
getData(getDataCallback);