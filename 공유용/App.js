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

  onAdd = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    return (
      <div>
        {/* <PopupArticle /> */}
        {/* {this.state.count} */}
        <TermProject count={this.state.count} onAdd={this.onAdd} />
      </div>
    );
  } //render()
}

export default App;
