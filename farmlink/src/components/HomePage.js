import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        HomePage
        <div>test</div>
        <Link to="/loginclient">Client Login</Link>
      </div>
    );
  }
}

export default HomePage;
