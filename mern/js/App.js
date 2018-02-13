// App.js
//destination
const contentNode = document.getElementById('contents');




// filter
class IssueFilter extends React.Component {
    render () {
        return (
        <div>This is the placeholder for the IssueFilter</div>
        )
    }
}


// table of issues


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
        id: 1, status: 'Open', owner: 'Ravan', created: new Date('2016-08-15'), effort: 5, completionDate: undefined, title: 'Error in console when clicking Add',
    },
    {
        id: 2, status: 'Assigned', owner: 'Eddie', created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'), title: 'Missing bottom border on panel',
    }
];

///////////////////////////////////////////////////////////////// ISSUE ROW FUNCTION (STATELESS COMPONENT)
const IssueRow = (props) => (
        <tr>
            <td>{props.issue.id}</td>
            <td>{props.issue.status}</td>
            <td>{props.issue.owner}</td>
            <td>{props.issue.created.toDateString()}</td>
            <td>{props.issue.effort}</td>
            <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
            <td>{props.issue.title}</td>
        </tr>
        )

///////////////////////////////////////////////////////////////// ISSUE TABLE FUNCTION (STATELESS COMPONENT)
function IssueTable(props) {
    const issueRows = props.issues.map(issue =><IssueRow key={issue.id} issue={issue} />);                                             
            return (
            <table className="bordered-table">
            <thead>
            <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completion Date</th>
            <th>Title</th>
            </tr>
            </thead>
            <tbody>
            {issueRows}
            </tbody>
            </table>
            );
    }


///////////////////////////////////////////////////////////////// ADD AN ISSUE CLASS OBJECT
class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.issueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: "New",
            created: new Date(),
        });
        //clear the fprm for the next input
        form.owner.value = ""; form.title.value = "";
    }
    render() {
        return (
            <div>
            <form name="issueAdd" onSubmit={this.handleSubmit}>
            <input type="text" name="owner" placeholder="Owner" />
            <input type="text" name="title" placeholder="Title" />
            <button>Add</button>
            </form>
            </div>
        )
    }

}


///////////////////////////////////////////////////////////////// BUILD AND MANIPULATE THE ISSUE LIST CLASS OBJECT
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
        fetch('/api/issues').then(response => response.json()).then(data => {
            console.log("Total count of records:",data._metadata.total_count);
            data.records.forEach(issue => {
                issue.created = new Date(issue.created);
                if (issue.completionDate)
                    issue.completionDate = new Date(issue.completionDate);
            });
            this.setState({
                issues: data.records
            });
        }).catch(err => {
            console.log(err);
        });
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
            <IssueFilter />
            <hr />
            <IssueTable issues={this.state.issues}/>
            <hr />
            <IssueAdd createIssue={this.createIssue}/>
        </div>
        );
    }
}

///////////////////////////////////////////////////////////////// RENDER TO THE DOM
ReactDOM.render(<IssueList />, contentNode);