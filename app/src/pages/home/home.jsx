import React from "react";

import img from "Images/testimage.png";

class Home extends React.Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-1">Loading images</h1>
        </div>
        <div className="container mt-2">
          This page is a test page
        </div>
        <div className="container mt-2">
          <img src={img} />
        </div>
      </section>
    );
  }
}

export default Home;
