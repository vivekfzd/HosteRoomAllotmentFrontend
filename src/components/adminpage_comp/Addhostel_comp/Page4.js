// Success msg
import React, { Component } from "react";

class Success extends Component {
  handleredirect = () => {
    this.setState(() => ({ redirect: true }));
  };

  render() {
    return (
      <div>
        <h2>Details Successfully Saved</h2>
      </div>
    );
  }
}

export default Success;
