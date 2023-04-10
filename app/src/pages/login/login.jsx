import React from "react";
// import { MongoClient } from "mongodb";
import "bootstrap/dist/css/bootstrap.min.css";
import ROUTES from "Constants/routes";
import "./login.css";
import Alert from "./errorHandler"
import { Navigate } from "react-router";

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false,
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
    window.api.checkMongo(this.state.Username, this.state.password)
    if (window.db.data.loggedIn){
      console.log("returned auth confirmation: ", window.db.data.loggedIn);
      this.setState({ loggedIn: true })

    } else {

      this.setAlertMessage('returned: ' + window.db.data.loggedIn + '\nIncorrect username/password')
      console.info("returned: ", window.db.data.loggedIn)

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
                Username
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
            <label htmlFor="password">
              Password
            </label>
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