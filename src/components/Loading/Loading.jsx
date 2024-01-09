import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="mt-5 d-flex justify-content-center">
      <div id="container">
        <label className="loading-title">Loading ...</label>
        <span className="loading-circle sp1">
          <span className="loading-circle sp2">
            <span className="loading-circle sp3"></span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Loading;
