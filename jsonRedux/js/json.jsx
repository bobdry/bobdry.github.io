////////////// React JSON parse using CORS Cross Origin Resource Sharing
const destinationNodeOne = document.getElementById('destinationOne');
const posts = [];

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make CORS request and return JSON response Text
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  //var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';
  var url = 'http://127.0.0.1:55074/jsonRedux/js/jsonTemp.json'
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  // Response handlers.
  xhr.onload = function(data) {
      pushRenderData(JSON.parse(xhr.responseText));
  };
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send(); 
}

// Push JSON response Text into posts ARR
function pushRenderData(data){ 
    $.each( data, function(key) {
        posts.push( data[key] );
    });
    console.log(posts);
    //data feeds into react component and renders
    reactJsonCorsProps();
}

//react component for JSON makeCorsRequest using PROPS
function reactJsonCorsProps() {
    //react function for constants with loops
    
    var itemOneLength = posts.length;

    //Make Arrs for each level of the JSON and push in the values that need to be  rendered
    //Arr holders
    const itemOneArr = [];   
    const itemTwoArr = [];
    const itemThreeArr = [];
    
    for (var i=0; i<itemOneLength; i++) {
        itemOneArr.push(posts[i])
        var itemTwoLength = posts[i].itemOnechildren.length
        for (var j=0; j<itemOneLength; j++) {
            itemTwoArr.push(posts[i].itemOnechildren[j])
            var itemThreeLength = posts[i].itemOnechildren[j].itemTwochildren.length
                for (var p=0; p<itemOneLength; p++) {
                itemThreeArr.push(posts[i].itemOnechildren[j].itemTwochildren[p])
            }
        }
    }
    console.log(itemOneArr);
    console.log(itemTwoArr);
    console.log(itemThreeArr);

    function JsonRender(props) {  
  
        const itemThreeArrFunc = itemThreeArr.map((item) =>
            <ul key={item.itemThree}>
                <li>{item.itemThree}</li>
            </ul>
        );

        const itemTwoArrFunc = itemTwoArr.map((item) =>
            <ul key={item.itemTwo}>
                <li>{item.itemTwo}</li>
                    {itemThreeArrFunc}
            </ul>
        );
                      
        const JsonRenderLoop = (
        <div>
        <h4>Menu</h4>
        <ul>
            {props.posts.map((post) =>
            <li key={post.itemOne}>
            {post.itemOne}
            {itemTwoArrFunc}
            </li>
            )}
        </ul>
        </div>
        );
        
        
    return (
        <div>
            {JsonRenderLoop}
        </div>
    );}
    //destination One render  
    ReactDOM.render(
    <JsonRender posts={posts} />,
    destinationOne
    );  
}
//call funcs to build component
makeCorsRequest(pushRenderData);