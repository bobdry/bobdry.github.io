var venTana = function (){
       if (window.innerWidth)
       {
               return window.innerWidth;
       }
       else if (document.body && document.body.offsetWidth)
       {
               return document.body.offsetWidth;
       }
       else
       {
               return 0;
       }
}

var tellMeTheSizes=function()
{
       document.getElementById("viewportwidth").innerHTML = "window width is " + venTana() + "px";
}

window.onload=function()
{
    tellMeTheSizes();
    if (venTana() > 900) {   
    console.log("bingo");
    }
}
window.onresize=function()
{
    tellMeTheSizes();
    console.log(venTana());
}

//vanilla js facts

//example of vars
    var globvar = 0;
//example of vars




// When a function is a member of an object, it is called a method. So dope is a method of funk.
var thisDope = document.getElementById("dopetastic");
var dope = function () {
    thisDope.innerHTML = "dopetastic";
    //example of function scoped var
    var funkvaronly = 1;
}
var funk = function () {
    dope();
    thisDope.innerHTML = thisDope.innerHTML + '<br>extra dope';  
}
funk ();
// When a function is a member of an object, it is called a method. So dope is a method of funk.




//There is a special variable, called *this* that is set to the object when a method of the object is called.
var thisDude = document.getElementById("funkster");

thisDude.addEventListener( 'mouseover', function() {
            this.innerHTML = "word";
        });
thisDude.addEventListener( 'mouseout', function() {
            this.innerHTML = "draw";
        });
//There is a special variable, called *this* that is set to the object when a method of the object is called.


//Here I am getting my parents's age, my OH my, they were born in 1945
	var date = new Date();
	date = date.getFullYear();
	var parentAge = date - 1945;
	console.log (parentAge);

//object Constructors for defining object Types
//function person(prototype,prototype,...)
function person(first, age, eye) {
    this.firstName = first;
    this.age = age;
    this.eyeColor = eye;
}

var myFather = new person("Nathan", parentAge, "blue");
var myMother = new person("Kay", parentAge, "brown");

document.getElementById("bigPoppa").innerHTML =
"My father, " + myFather.firstName + " is " + myFather.age + ".<br>My mother, " + myMother.firstName + " is " + myMother.age + "."; 
//object Constructors for defining object Types




//Constructors and prototypes are hard to reason. Members can be added to the prototype by assignment. Here we define a new class Demo, which inherits from class Ancestor, and adds its own method foo.
//function Demo() {}
//Demo.prototype = new Ancestor();
//Demo.prototype.foo = function () {};




// for loops are (init; condition; increment++)
thisDude.addEventListener( 'click', function() {
   for(var i=0; i < 10; i++) {
  console.log("we gettin loopy with it");
  console.log(i); // console logs it 10 times at moment of click so in other words the loop fires off until limit is reached, also condition of object.length is good hear to end loop     
}
});
// for loops are (init; condition; increment++)




// how to set a var number object and increment it 
var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
}

var thisHeck = document.getElementById("bigHeck");

myObject.increment();
thisHeck.innerHTML = myObject.value; 

myObject.increment(11);
thisHeck.innerHTML = thisHeck.innerHTML + '<br>' + myObject.value; 
// how to set a var number object and increment it 




// define walk the DOM
var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};
//accumalate an array of node objects
var getElementsByAttribute = function (att, value) {
  var results = [];
  var thisDOM = document.getElementById("DOMwalk");  
  
  walk_the_DOM(document.body, function (node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    //if (typeof actual === 'string' && (actual === value || typeof value !== 'string')){results.push(node);}
    results.push(node);
  });

  thisDOM.innerHTML = results;
};
getElementsByAttribute();
// define walk the DOM




//avoid creating functions within a loop, create a helper function outside of the loop that will deliver a function that binds to the current value of i
    //parent function
    var add_the_handlers = function (nodes) {
    //helper function
        var helper = function (i) {
        return function (e) {
            var M = i + +1;
            alert("this is div #"+ M);
        };
        };
    // counter var
        var i;
    // loop
        for (i = 0; i < nodes.length; i += 1) {
            nodes[i].onclick = helper(i);
            }
    };
// pull those divs 
var noder = document.getElementsByTagName("div");
// alerts to div position in the DOM
add_the_handlers(noder);
//avoid creating functions within a loop, create a helper function outside of the loop that will deliver a function that binds to the current value of i


//condense functions using arguments
function getDistance(speed, time) {
    var result = speed * time;
    console.log(result);
}

getDistance(10, 5);
//condense functions using arguments