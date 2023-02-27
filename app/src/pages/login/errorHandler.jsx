import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import "./login.css";
import Userfront from "@userfront/core";

class Alert extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      if (!this.props.message) return "";
      return <div id="alert">{this.props.message}</div>;
    }
}
export default Alert;