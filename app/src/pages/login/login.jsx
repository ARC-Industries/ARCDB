import React from "react";
// import { MongoClient } from "mongodb";
import "bootstrap/dist/css/bootstrap.min.css";
import ROUTES from "Constants/routes";
import { Link, redirect } from "react-router-dom";
import "./login.css";
// import Userfront from "@userfront/core";
// import { checkMongo } from "Functions/loginHandler"

// Initialize Userfront Core JS
// Userfront.init("test123");
import Alert from "./errorHandler"

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mobileMenuActive: false,
      Username: "",
      password: "",
      alertMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
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
    if ( window.api.checkMongo(this.state.Username, this.state.password)){
      console.log("returned auth confirmation");
      redirect(ROUTES.HOME);
    } else {
      this.setAlertMessage('returned: ' + window.api.checkMongo(this.state.Username, this.state.password))
        console.info("returned: ", window.api.checkMongo(this.state.Username, this.state.password))
    }
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }


  render() {
    return (
      <React.Fragment>
        <div className="Auth-form-container">
          <Alert message={this.state.alertMessage} />
          <form onSubmit={this.handleSubmit} className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Login</h3>
            <div className="form-group mt-3">
              <label className="">
                username
              </label>
                  <input
                    name="Username"
                    type="username"
                    className="form-control mt-1"
                    value={this.state.Username}
                    onChange={this.handleInputChange}
                  />
            </div>
            <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                className="form-control mt1"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">Log in</button>
            </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;