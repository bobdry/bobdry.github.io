// App.js

//destination
const contentNode = document.getElementById('contents');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;



//////////////////////////////////////////////////////////////////////////state one
class RouteA extends React.Component {
  btnClickB() {
    browserHistory.push('/b');
  }
  render() {
    return(
      <div>
        <div>
        <h1>Have something to say?</h1>
          <button className="btn btn-default" onClick={ this.btnClickB }>Goto B</button>
        </div>
      </div>
    );
  }
}
//////////////////////////////////////////////////////////////////////////end state one



//////////////////////////////////////////////////////////////////////////state two
//app components
//Parser needs
const inputParsers = {
  number(input) {
    return parseFloat(input);
  },
};
//Shaker component
class ShakingError extends React.Component {
	constructor() { super(); this.state = { key: 0 }; }

	componentWillReceiveProps() {
    // update key to remount the component to rerun the animation
  	this.setState({ key: ++this.state.key });
  }
  
  render() {
  	return <div key={this.state.key} className="bounce">{this.props.text}</div>;
  }
}
// My Form CLASS OBJECT
class MyForm extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
    	this.setState({
        invalid: true,
        displayErrors: true,
      });
      return;
    }
    const form = event.target;
    const data = new FormData(form);

    for (let name of data.keys()) {
      const input = form.elements[name];
      const parserName = input.dataset.parse;
      if (parserName) {
        const parsedValue = inputParsers[parserName](data.get(name))
        data.set(name, parsedValue);
      }
    }
    
    this.setState({
        res: stringifyFormData(data),
        invalid: false,
        displayErrors: false,
    });
    fetch('https://api.formbucket.com/f/buk_F1leehEmHvuGbKf9wZWtpWQI', {
        method: 'post',
        mode: 'cors',
        headers: {
            'accept' : 'application/javascript',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        username: username.value,
        email: email.value,
        something: something.value
        })
    });
      
    //send it to a DynamoDB
    //https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html
    //send it to a MongoDB
    //???
    //send it to formbucket
    //see above, it's in place
      
    //go to Thank You
    browserHistory.push('/c');
  }

  render() {
  	const { res, invalid, displayErrors } = this.state;
    return (
    	<div>
        <form
          onSubmit={this.handleSubmit}
          noValidate
          className={displayErrors ? 'displayErrors' : ''}
         >
          <input id="username" name="username" type="text" placeholder="Name" required/>
          <input id="email" name="email" type="email" placeholder="Email" required />
          <input id="something" name="something" type="text" placeholder="Something..." required />
          <button>Submit</button>
        </form>
        
        
        
        <div className="res-block">
          {invalid && (
            <ShakingError text="Oops, fix the red." />
          )}
          {!invalid && res && (
          	<div>
              <h3>Transformed data to be sent:</h3>
              <pre>FormData {res}</pre>
          	</div>
          )}
        </div>
    	</div>
    );
  }
}
//state two route
class RouteB extends React.Component {
  btnClickC() {
    browserHistory.push('/c');
  }

  render() {
    return(
      <div>
        <h2>Route B</h2>
        <MyForm />
      </div>
    );
  }
}
//////////////////////////////////////////////////////////////////////////end state two




//////////////////////////////////////////////////////////////////////////state three
class RouteC extends React.Component {
  btnClickA() {
    browserHistory.push('/a');
  }

  btnClickB() {
    browserHistory.push('/b');
  }

  render() {
    return(
      <div>
        <h2>Thank you</h2>
        <p>Your something has been received.</p>
        <div>
          <button className="btn btn-default" onClick={ this.btnClickA }>Go to home</button>
          <button className="btn btn-default" onClick={ this.btnClickB }>Go to form</button>
        </div>
      </div>
    );
  }
}
//////////////////////////////////////////////////////////////////////////end state three



//////////////////////////////////////////////////////////////////////////router render
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={RouteA} />
    <Route path="/a" component={RouteA} />
    <Route path="/b" component={RouteB} />
    <Route path="/c" component={RouteC} />
    <Route path="*" component={RouteA} />
  </Router>,
  contentNode
);
//////////////////////////////////////////////////////////////////////////end router render



//from validator - stringify
function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}
/* origi router example https://codepen.io/lsmoura/pen/pNPOzp */