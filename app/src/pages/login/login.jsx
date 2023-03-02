import React from "react";
// import { MongoClient } from "mongodb";
import "bootstrap/dist/css/bootstrap.min.css";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import "./login.css";
// import Userfront from "@userfront/core";
// import { checkMongo } from "Functions/loginHandler"

// Initialize Userfront Core JS
// Userfront.init("test123");
import Alert from "./errorHandler"
// import { MongoClient } from "mongodb";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      password: "",
      alertMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this)
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
    console.info(target.name," : ", target.value)
  }

  handleSubmit(event) {
    event.preventDefault();
    // Reset the alert to empty
    this.setAlertMessage();
    if ( window.api.checkMongo(this.state.Username, this.state.password) === "authd"){
      console.log("returned auth confirmation")
    } else {
      console.info("returned: ", window.api.checkMongo(this.state.Username, this.state.password))
    }
    // Userfront.login({
    //   method: "password",
    //   Username: this.state.Username,
    //   password: this.state.password,
    // }).catch((error) => {
    //   console.info("submit was touched")
    //   this.setAlertMessage(error.message);
    // });
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Alert message={this.state.alertMessage} 
          />
          <form onSubmit={this.handleSubmit}>
            <label>
              username
              <input
                name="Username"
                type="username"
                value={this.state.Username}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
            <button type="submit">Log in</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;