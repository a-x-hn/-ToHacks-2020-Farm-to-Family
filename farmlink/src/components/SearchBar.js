import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  //updates inputValue when text is inputted into keyboard
  /*
  searchChange = (event) => {
    console.log("change", event.target.value);
    this.setState({
      inputValue: event.target.value,
    });
  };
*/

  render() {
    return (
      //searchbar component
      <div className="ui category search">
        <div className="ui icon input">
          <input
            className="prompt"
            onChange={this.props.onChange}
            type="text"
            placeholder="Search Goods..."
          />
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
    );
  }
}

export default SearchBar;
