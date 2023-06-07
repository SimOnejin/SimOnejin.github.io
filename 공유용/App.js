import "./App.css";
import React from "react";
import TermProject from "./03/TermProject";

// import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      TabState: "Pants",
    };
  }

  toggle = (tabnum) => {
    if (this.state.TabState !== tabnum) this.setState({ TabState: tabnum });
  };

  IncreaseCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };
  DecreaseCount = () => {
    this.setState((prevState) => ({
      count: (this.state.count = 0),
    }));
  };

  render() {
    return (
      <div>
        {/* <PopupArticle /> */}
        {/* {this.state.count} */}
        <TermProject
          count={this.state.count}
          IncreaseCount={this.IncreaseCount}
          DecreaseCount={this.DecreaseCount}
        />
      </div>
    );
  } //render()
}

export default App;
