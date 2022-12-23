import React from "react";

const Error = () => {
  
  const fullScreen = {
    position: "absolute",
    width: "100%",
    left: "0",
    top: "0",
    backgroundColor: "white",
    zIndex: "200"
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100" style={fullScreen}>
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger"></span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Error;
