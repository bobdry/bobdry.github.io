// Init.js
//destination
const contentNode = document.getElementById('contents');

// table of issues


//BorderWrap component for row style

class InitButton extends React.Component {
    render() {
            return (
            <div>
            <form>
            <button>Submit</button>
            </form>
            </div>
            );
    }
}

///////////////////////////////////////////////////////////////// RENDER TO THE DOM
ReactDOM.render(<InitButton />, contentNode);