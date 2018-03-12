/* function getViewportWidth()
{
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
       document.getElementById("viewportwidth").innerHTML = getViewportWidth() + "px";
}

window.onload=function()
{
       tellMeTheSizes();
}

window.onresize=function()
{
       tellMeTheSizes();
}
*/

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
window.onload=function()
{
    if (venTana() > 900) {   
    console.log("bingo");
    }
}
window.onresize=function()
{
    console.log(venTana());
}