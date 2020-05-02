import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        HomePage
        <div>test</div>
        <Link to="/Login">Login</Link>
        <SearchBar />
      </div>
    );
  }
}

export default HomePage;
