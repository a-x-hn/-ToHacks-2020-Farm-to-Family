import React from "react";

class SearchBar extends React.Component {
  state = {
    inputValue: "",
  };

  render() {
    return (
      <div className="ui category search">
        <div className="ui icon input">
          <input className="prompt" type="text" placeholder="Search Goods..." />
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
    );
  }
}

export default SearchBar;
