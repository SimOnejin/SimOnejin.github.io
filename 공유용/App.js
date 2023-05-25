import "./App.css";
import React from "react";
import TermProject from "./03/TermProject";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  IncreaseCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };
  DecreaseCount = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
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
