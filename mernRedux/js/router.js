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
          <button className="btn btn-default" onClick={ this.btnClickB }>Goto B</button>
        </div>
      </div>
    );
  }
}
//////////////////////////////////////////////////////////////////////////end state one




//////////////////////////////////////////////////////////////////////////state two
//app components
//BorderWrap component for row style
class BorderWrap extends React.Component {
    render() {
        const borderStyle = {border: "1px solid silver, padding 6;"};
            return (
                <div style={borderedStyle}>
                    {this.props.children}
                </div>
            );
    }
}
//JS Array of issues
const issues = [
    {
        id: 1, firstName: 'Joe', lastName: 'Bounds', cellNum: '919.621.8941', eMailAt: 'bob@bob.com', quantityCopies: '5', created: new Date('2016-08-15')
    },
];
// ISSUE ROW FUNCTION (STATELESS COMPONENT)
const IssueRow = (props) => (
        <tr>
            <td>{props.issue.id}</td>
            <td>{props.issue.firstName}</td>
            <td>{props.issue.lastName}</td>
            <td>{props.issue.cellNum}</td>
            <td>{props.issue.eMailAt}</td>
            <td>{props.issue.quantityCopies}</td>
            <td>{props.issue.created.toDateString()}</td>
        </tr>
        )
// ISSUE TABLE FUNCTION (STATELESS COMPONENT)
function IssueTable(props) {
    const issueRows = props.issues.map(issue =><IssueRow key={issue.id} issue={issue} />);                                             
            return (
            <table className="bordered-table">
            <thead>
            <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Cell</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {issueRows}
            </tbody>
            </table>
            );
    }
// ADD AN ISSUE CLASS OBJECT
class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.issueAdd;
        this.props.createIssue({
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            cellNum: form.cellNum.value,
            eMailAt: form.eMailAt.value,
            quantityCopies: form.quantityCopies.value,
            created: new Date(),
        });
        //clear the form for the next input
        form.firstName.value = ""; form.lastName.value = ""; form.cellNum.value = ""; form.eMailAt.value = ""; form.quantityCopies.value = "";
        //submit and load thank you if form validates
        browserHistory.push('/c');
    }
    render() {
        return (
            <div>
            <form name="issueAdd" onSubmit={this.handleSubmit}>
            <input type="text" name="firstName" className="form-control" placeholder="First Name" />
            <input type="text" name="lastName" className="form-control" placeholder="Last Name" /><br/>
            <input type="text" name="cellNum" className="form-control" placeholder="Cell" />
            <input type="text" name="eMailAt" className="form-control" placeholder="Email" /><br/>
            <input type="text" name="quantityCopies" className="form-control" placeholder="Quantity" /><br/>
            <button>Submit</button>
            </form>
            </div>
        )
    }

}
// BUILD AND MANIPULATE THE ISSUE LIST CLASS OBJECT
class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount() {
        this.loadData();
    }
    
    loadData() {
        setTimeout(() => {this.setState({issues: issues});}, 500);
    }
    
    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({ issues: newIssues });
    }
    
    render() {
        return (
        <div>
        <h1>Issue Tracker</h1>
            <hr />
            <IssueTable issues={this.state.issues}/>
            <hr />
            <IssueAdd createIssue={this.createIssue}/>
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
        <IssueList />
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
        <p>Message</p>
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

/* origi example https://codepen.io/lsmoura/pen/pNPOzp

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
        <h2>Route C</h2>
        <div>
          <button className="btn btn-default" onClick={ this.btnClickA }>Goto A</button>
          <button className="btn btn-default" onClick={ this.btnClickB }>Goto B</button>
        </div>
      </div>
    );
  }
}

*/