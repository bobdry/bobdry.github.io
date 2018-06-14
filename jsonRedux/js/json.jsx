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
  var url = 'http://127.0.0.1:57187/jsonRedux/js/jsonTemp.json'
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
//toggler
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
        <li className={this.state.isToggleOn ? 'nopen' : 'expand'} onClick={this.handleClick}>
        {this.props.name}
        <p>{this.props.details}</p>
        </li>
    );
  }
}
//react component for JSON makeCorsRequest using PROPS
function reactJsonCorsProps() {
    //react function for constants with loops
    function JsonRender(props) {      
    const JsonRenderLoop = (      
        <div className="jsonMenuStyle">
        <h4>Menu</h4>
        <ul>
            {props.posts.map((post, i) =>
            <div key={post.itemOne}>
            <Toggle name={post.itemOne}/>
            <ul>                   
            {
            post.itemOnechildren.map((subpost, j) => {
                return (
                <div key={subpost.itemTwo}>
                <Toggle name={subpost.itemTwo}/>
                <ul>
                    {
                    subpost.itemTwochildren.map((subpostsub, k) => {
                    return (  
                    <Toggle name={subpostsub.itemThree} details={subpostsub.itemThreedetails} key={subpostsub.itemThree}/>
                    )
                    })
                    }             
                </ul>
                </div>
                )
                })
            }
            </ul>
            </div>
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