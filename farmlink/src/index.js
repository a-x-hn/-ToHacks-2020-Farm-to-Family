import React, { Component } from "react";
import "./index.css";
import Navbar from "./components/navbar";
import Landing from "./components/HomePage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
      </div>
    );
  }
}
export default App;

/*
import React from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Link,
  Switch
 } from "react-router-dom";
import HomePage from "./components/HomePage";
import login from "./components/login";
import register from "./components/register";

class App extends React.Component {

  nextPath(path) {
    this.props.history.push(path);
  }


  render() {
    return (
      <button onClick={() => this.nextPath(login)}>
        Log In
      </button>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
*/