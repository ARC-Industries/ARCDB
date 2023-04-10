import React from "react";
import ROUTES from "Constants/routes";
import { useNavigate } from "react-router-dom";
import {
  validateLicenseRequest,
  validateLicenseResponse,
} from "secure-electron-license-keys";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuActive: false,
      licenseModalActive: false,
      isLoggedIn: false,

      // license-specific
      licenseValid: false,
      allowedMajorVersions: "",
      allowedMinorVersions: "",
      appVersion: "",
      licenseExpiry: "",
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    // this.toggleLicenseModal = this.toggleLicenseModal.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  login = () => {
    this.setState({ isLoggedIn: true })
  };
  logout = () => {
    this.setState({ isLoggedIn: false })
  }

  componentWillUnmount() {
    window.api.licenseKeys.clearRendererBindings();
  }

  componentDidMount() {
    // Set up binding to listen when the license key is
    // validated by the main process
    const _ = this;

    window.api.licenseKeys.onReceive(validateLicenseResponse, function (data) {
      // If the license key/data is valid
      if (data.success) {
        // Here you would compare data.appVersion to
        // data.major, data.minor and data.patch to
        // ensure that the user's version of the app
        // matches their license
        _.setState({
          licenseValid: true,
          allowedMajorVersions: data.major,
          allowedMinorVersions: data.minor,
          allowedPatchVersions: data.patch,
          appVersion: data.appVersion,
          licenseExpiry: data.expire,
        });
      } else {
        _.setState({
          licenseValid: false,
        });
      }
    });
  }

  toggleMenu(_event) {
    this.setState({
      mobileMenuActive: !this.state.mobileMenuActive,
    });
  }

  // Using a custom method to navigate because we
  // need to close the mobile menu if we navigate to
  // another page

  // please note that we are trying to make it render after login is confirmed
  navigate(url) {
    this.setState(
      {
        mobileMenuActive: false,
      },
      function () {
        this.props.navigate(url);
      }
    );
  }

  render() {
    return (
      <div> </div>
      //  <nav
      //   className="navbar is-dark"
      //   role="navigation"
      //   aria-label="main navigation">
      //   <div className="navbar-brand">
      //     <a
      //       role="button"
      //       className={`navbar-burger ${
      //         this.state.mobileMenuActive ? "is-active" : ""
      //       }`}
      //       data-target="navbarBasicExample"
      //       aria-label="menu"
      //       aria-expanded="false"
      //       onClick={this.toggleMenu}>
      //       <span aria-hidden="true"></span>
      //       <span aria-hidden="true"></span>
      //       <span aria-hidden="true"></span>
      //     </a>
      //   </div>
      //   <div
      //     id="navbarBasicExample"
      //     className={`navbar-menu ${
      //       this.state.mobileMenuActive ? "is-active" : ""
      //     }`}>
      //     <div className="navbar-start">
      //       <a
      //         className="navbar-item"
      //         onClick={() => this.navigate(ROUTES.LOGIN)}>
      //         Homer
      //       </a>

      //       <a
      //         className="navbar-item"
      //         onClick={() => this.navigate(ROUTES.ABOUT)}>
      //         Marge
      //       </a> 

      //       <div className="navbar-item has-dropdown is-hoverable">
      //         <a className="navbar-link">Sample pages</a>

      //         <div className="navbar-dropdown">
      //           <a
      //             className="navbar-item"
      //             onClick={() => this.navigate(ROUTES.MOTD)}>
      //             Using the Electron store
      //           </a>
      //           <a
      //             className="navbar-item"
      //             onClick={() => this.navigate(ROUTES.LOCALIZATION)}>
      //             Changing locales
      //           </a>
      //           <a
      //             className="navbar-item"
      //             onClick={() => this.navigate(ROUTES.UNDOREDO)}>
      //             Undo/redoing actions
      //           </a>
      //           <a
      //             className="navbar-item"
      //             onClick={() => this.navigate(ROUTES.CONTEXTMENU)}>
      //             Custom context menu
      //           </a>
      //           <a
      //             className="navbar-item"
      //             onClick={() => this.navigate(ROUTES.IMAGE)}>
      //             Sample image loaded
      //           </a>
      //         </div>
      //       </div>
      //     </div> 
      //     {this.renderLicenseModal()}
      //     <div className="navbar-end">
      //       <div className="navbar-item">
      //         <div className="buttons">
      //           <a
      //             className="button is-light"
      //             onClick={this.toggleLicenseModal}>
      //             Check license
      //           </a>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </nav> 
    );
  }
}

function WithNavigate(props){
  const navigate = useNavigate();
  return <Nav {...props} navigate={navigate} />
}

export default WithNavigate;
