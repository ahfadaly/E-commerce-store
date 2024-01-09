import React from "react";
import Products from "../Products/Products";

const Home = () => {
  return (
    <div className="hero">
      <div className="card bg-dark text-white border-0 rounded-0">
        <img src="/assets/ecommerce.jpg" className="card-img" height="700px" alt="" />
        <div className="card-img-overlay d-flex align-items-center">
          <div className="container">
            <h5 className="card-title display-3 fw-bolder">E Commerce</h5>
            <p className="card-text lead col-md-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci magnam harum at minus fuga, dolorem recusandae dolore id
              sunt sit, corrupti quaerat amet hic distinctio consequuntur odio, numquam nobis voluptate.
            </p>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default Home;
