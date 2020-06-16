import React from "react";
import Login from "./Loginpage_comp/Login";

class Loginpage extends React.Component {
  render() {
    return (
      <div className="loginflex">
        <div className="login">
          <h2 className="logintag">Log In Here...</h2>
          <Login authenticated={this.props.authenticated} />
        </div>
      </div>
    );
  }
}

export default Loginpage;
