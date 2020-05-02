import React from "react";
class Navbar extends React.Component {
    render() {
      return (
          <div class="ui secondary  menu">
              <Link to="/">User-landingpage</Link>
              <a class="item">
                  Farmlink
              </a>
              <div class="right menu">
                  <a class="item">
                      Current Order
                  </a>
                  <a class="item active">
                      Your account
                  </a>
              </div>
          </div>
      );
    }
  }
  
  export default Navbar;