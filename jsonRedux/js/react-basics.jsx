// react-basics.js V16
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######1111111
//destination One -- super basic constant passed and written to Dom.render
const destinationNodeOne = document.getElementById('destinationOne');

const name = 'Basics';
const element = <div><h2>Hello, {name}</h2><h3>Passing some <em>Props</em></h3></div>;

ReactDOM.render(
  element,
  destinationOne
);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######2222222
//destination Two -- our first component, components must start with a capital letter
const destinationNodeTwo = document.getElementById('destinationTwo');
//Component
class FirstComponent extends React.Component {
    render () {
        return <div>    
            <p>Hello, {this.props.name}</p>
        </div>
    }
}
//pass this Prop
const elementTwo = <FirstComponent name="Sara one prop only" />;

ReactDOM.render(
  elementTwo,
  destinationNodeTwo
);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######3333333
//destination Three -- our App component, the big Momma component, holds all the smaller components with their props and states
const destinationNodeThree = document.getElementById('destinationThree');
//set the App component as the main holder for all the other components
class App extends React.Component {
    render () {
        return (
            <div>
                <FirstComponent name="Prop One Bobby" />
                <FirstComponent name="Prop Two Sally" />
                <FirstComponent name="Prop Three Danny" />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  destinationNodeThree
);
//some more fundamentals... separate out component as much as possible if the pieces don't depend on each other
//props are ready only in that values must be passed into them but can be returned back out
//so if ur just writing data to a component that will remain constant you can use props
//BUT if you need component data to change over time or in response to something use state

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######4444444
//And here we go with STATE using a simple clock as an example
const destinationNodeFour = document.getElementById('destinationFour');

class SimpleClock extends React.Component {
    //ok for defining State you need a constructor that sets the init state
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    //next with States components you have a few "life cycle" hooks like:
    componentDidMount() {
    //here we set a timer interval
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    }
    //and this
    componentWillUnmount() {
    //here we clear the timer
        clearInterval(this.timerID);
    }
    //here we tie the timer to new Date with a func to update the State with the tick func of every 1000ms
    tick() {
        this.setState({
            date: new Date()
        });
    }
    
    render () {
        return (
            <div>
                <h2>&nbsp;</h2>
                <h3>Simple clock to show <em>State</em></h3>
                <p>It is {this.state.date.toLocaleTimeString()}</p>
            </div>
        )
    }
}

ReactDOM.render(
    <SimpleClock />,
    destinationNodeFour
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######5555555
//Handling events
const destinationNodeFive = document.getElementById('destinationFive');

//you'll probably need a preventDefault
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
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
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON BABY' : 'OFF BABY'}
      </button>
    </div>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  destinationNodeFive
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######6666666
//Conditional Rendering, docs have example of rendering different components based on if statements
//ALSO seems as though really have to use two types of func styles, regular func nameFunc(arguments) {}; 
//and class nameComponent extends React.Component {};

//this example uses the "?" instead of "if" to toggle between login and logout UI buttons
//we can use props or state to display and 
const destinationNodeSix = document.getElementById('destinationSix');
//2 login components
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

// login controller component
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    // here's the if in the form of a "?", once clicked the state is set to the alternate state
    // {button} is the container/const for the two components 
    const button = isLoggedIn ? (
      <LogoutButton onClick={this.handleLogoutClick} />
    ) : (
      <LoginButton onClick={this.handleLoginClick} />
    );
    return (
      <div>
        <h3>if conditional uses a "?" to toggle login button by updating state</h3>
        {button}
      </div>
    );
  }
}
ReactDOM.render(
  <LoginControl />,
  destinationNodeSix
);
//


//Continuing with conditionals
//for doing Math conditions use {var.length > 0 && <html>content</html>}
const destinationNodeSixhalf = document.getElementById('destinationSixhalf');
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h3>the "&&" operator for doing conditional Math output</h3>
      {unreadMessages.length > 0 &&
        <div>
                  <p>if <strong>Math</strong> condition is true, JSX renders</p>
                  <p>'React', 'Re: React', 'Re:Re: React'</p>
        <p>
            You have <strong>{unreadMessages.length}</strong> unread messages.
        </p></div>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  destinationSixhalf
);

//there's also an example of rendering a component to null based on conditions at the end of the Conditional docs

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######7777777
//Lists & Keys
//.map function in es6 takes a data set/json data and maps each item to JSX elements
//each item needs a unique key so that it can be identified for manipulating, ie. edit bug #42967
const destinationNodeSeven = document.getElementById('destinationSeven');
function Blog(props) {
  const sidebar = (
    <div className="listSidebar">
    <h4>Sidebar</h4>
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
    </div>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      {content}
    </div>
  );
}

const posts = [
  {id: 11, title: 'List item 1 = Hello World', content: 'Welcome to learning React!'},
  {id: 12, title: 'List item 2 = Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  destinationNodeSeven
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######88888888
//Forms are Controled Components
const destinationNodeEight = document.getElementById('destinationEight');

class FormComponent extends React.Component {
    render () {
        return <div>    
            <p>React forms can handle inputs, textareas, selects but most inputs need handlers</p>
            <p>Refer to docs for examples</p>
            <p>Refer to <a href="https://bobdry.github.io/mernRedux/">React Router Form</a> for ongoing work in form creation, validation and submission with React Router.</p>
        </div>
    }
}

ReactDOM.render(
  <FormComponent />,
  destinationNodeEight
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######9999999
//Lifting state up
//lift it up to the closest common ancestor/parent
//example is of Faren and Celcius inputs that stay in sync because degree number is kept at...
//the parent Calculator component and passed as props to the two inputs 
//install react developer tools at some point for debugging https://github.com/facebook/react-devtools

const destinationNodeNine = document.getElementById('destinationNine');

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <h3>The water would boil.</h3>;
  }
  return <h3>The water would not boil.</h3>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '0', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  destinationNodeNine
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######10101010
//Composition of Funcs & Components

const destinationNodeTen = document.getElementById('destinationTen');

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h3 className="Dialog-title">
        {props.title}
      </h3>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="React Exploration Program"
              message="What's your name?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}

ReactDOM.render(
  <SignUpDialog />,
  destinationNodeTen
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ######1111111
//Thinking in React

const destinationNodeEleven = document.getElementById('destinationEleven');

class ThinkingReact extends React.Component {
    render () {
        return <div>    
            <p><a href="https://reactjs.org/docs/thinking-in-react.html" target="_blank"><strong>my head hurts</strong></a></p>
            <p>none the less, doc has basic guidance for building the SPA: component hierchy, static build with Props, ID stateful components, add funcs + State + rendering, test</p>
        </div>
    }
}

ReactDOM.render(
  <ThinkingReact />,
  destinationNodeEleven
);