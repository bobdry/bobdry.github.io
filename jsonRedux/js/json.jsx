////////////// React JSON parse using CORS Cross Origin Resource Sharing
const destinationNodeOne = document.getElementById('destinationOne');
const destinationNodeTwo = document.getElementById('destinationTwo');
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
  var url = 'http://127.0.0.1:50807/jsonRedux/js/jsonTemp.json'
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
    //console.log(posts);
    //data feeds into react function and renders
    reactJsonCorsProps();
}

//react component for JSON makeCorsRequest using PROPS
function reactJsonCorsProps() {
    //react function for constants with loops
    function JsonRender(props) { 

    let className = 'menu';
        
    function handleClick(e) {
        e.preventDefault();
        if (className == 'menu') {
        className = 'menu-active'
        }
        else {
            className = 'menu'
        }
        console.log(className);    
    }
        
    const JsonRenderLoop = (

        <div>
        <h4>Menu</h4>
        <ul>
            {props.posts.map((post, i) =>
            <li key={post.itemOne} id={post.itemOne} className={className} onClick={handleClick}>
            {post.itemOne}
            {
            post.itemOnechildren.map((subpost, j) => {
                return (
                <ul key={subpost.itemTwo}>
                <li className="linkSubdue">
                {subpost.itemTwo}
                {
                    subpost.itemTwochildren.map((subpostsub, k) => {
                    return (
                    <ul key={subpostsub.itemThree}>
                    <li>
                    {subpostsub.itemThree}
                    <p>{subpostsub.itemThreedetails}</p>
                    </li>
                    </ul>
                    )
                    })
                }              
                </li>
                </ul>
                )
                })
            }
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


class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  //events are passed as a func like this in the render
  render() {
    return (
    <div>
            <h3>ON OFF toggle for Handling <em>Events</em></h3>
      <button className={this.state.isToggleOn ? 'ON BABY' : 'OFF BABY'} onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON BABY' : 'OFF BABY'}
      </button>
    </div>
    );
  }
}
    ReactDOM.render(
    <Toggle />,
    destinationTwo
    );  

//call funcs to build component
makeCorsRequest(pushRenderData);