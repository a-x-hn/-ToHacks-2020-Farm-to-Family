import React from "react";
import { Link } from "react-dom";

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
  }

  handleChange(queries, value) {
    this.setState({ [queries]: value });
    console.log("change", this.state[queries]);
  }

  render() {
    return (
      <div>
        <NavBar />
        <SearchBar onChange={this.handleChange} value={this.state[queries]} />
        <p>items: </p>
      </div>
    );
  }
}
