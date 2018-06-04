/// react component for rendering JSON object provided by makeCorsRequest using STATE
class JsonCorsComponent extends React.Component {
    //ok for defining State you need a constructor that sets the init state
    constructor(props) {
        super(props);
        this.state = {
                        itemOne: "",
                        itemTwo: "",
                        itemThree: ""
                     };
    }
    //next with States components you have a few "life cycle" hooks like:
    componentDidMount() {      
        this.setState ({
                itemOne: "1",
                itemTwo: "2",
                itemThree: "3"
        });
        }

        //render the magic
        render() {
            return (
            <div>
		      <h2>Data</h2>
                {this.state.itemOne}
                {this.state.itemTwo}
                {this.state.itemThree}
            </div>
      );
    }
}


///////////////////////////////////////////////////////////////////////////// Not used but worth keeping
//Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}